import asyncio
import json
import os
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Request
from fastapi.middleware.cors import CORSMiddleware
from app.services.lb_node import LoadBalancerNode
from app.services.server_manager import server_manager
from app.core.config import settings
from app.simulation.traffic_generator import traffic_generator
from app.simulation.failure_simulator import failure_simulator
from app.core.redis_client import redis_client

app = FastAPI(title=settings.PROJECT_NAME)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# LB Node instance (configured via environment variable for distributed simulation)
node_id = os.getenv("NODE_ID", "lb-node-1")
lb_node = LoadBalancerNode(node_id)
traffic_generator.set_lb_node(lb_node)

@app.on_event("startup")
async def startup_event():
    # Initialize servers if they don't exist
    server_manager.initialize_servers(settings.NUM_BACKEND_SERVERS)

@app.get("/health")
async def health_check():
    return {"status": "online", "node_id": node_id}

@app.post("/request")
async def process_request(request: Request):
    # Simulate a request hitting the LB
    client_ip = request.client.host
    result = await lb_node.handle_request(client_ip)
    return result

@app.post("/config/algorithm")
async def set_algorithm(algo: str):
    lb_node.set_algorithm(algo)
    return {"status": "updated", "algorithm": algo}

@app.get("/servers")
async def get_servers():
    return server_manager.get_all_servers()

@app.post("/simulation/start")
async def start_simulation(pattern: str = "constant", rate: int = 10):
    traffic_generator.start(pattern, rate)
    failure_simulator.start()
    return {"status": "started", "pattern": pattern, "rate": rate}

@app.post("/simulation/stop")
async def stop_simulation():
    traffic_generator.stop()
    failure_simulator.stop()
    return {"status": "stopped"}

@app.post("/simulation/reset")
async def reset_simulation():
    # Stop simulation first
    traffic_generator.stop()
    failure_simulator.stop()
    # Clear Redis
    redis_client.client.delete(server_manager.SERVERS_KEY)
    # Re-initialize
    server_manager.initialize_servers(settings.NUM_BACKEND_SERVERS)
    return {"status": "reset"}

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

manager = ConnectionManager()

@app.websocket("/ws/metrics")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    
    try:
        # Subscribe to metrics channel in Redis
        # For simplicity, we'll use a local broadcast for now 
        # but in a distributed setup, this would be a Redis PubSub listener
        while True:
            servers = server_manager.get_all_servers()
            await websocket.send_json({
                "type": "heartbeat",
                "servers": [s.model_dump() for s in servers],
                "node_id": node_id
            })
            await asyncio.sleep(1)
    except WebSocketDisconnect:
        manager.disconnect(websocket)

# Background task to listen to Redis metrics and broadcast to all WS clients
@app.on_event("startup")
async def metrics_listener():
    loop = asyncio.get_event_loop()
    loop.create_task(redis_metrics_listener())

async def redis_metrics_listener():
    # This would ideally use a real pub/sub listener
    # But since we are using Upstash/REST sometimes, we'll keep it simple
    pass
