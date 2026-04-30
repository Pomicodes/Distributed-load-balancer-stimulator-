import asyncio
import time
import uuid
from typing import Optional
from app.models.server import Server, RequestMetadata
from app.services.server_manager import server_manager
from app.algorithms.lb_algorithms import (
    RoundRobin, LeastConnections, WeightedRoundRobin, ConsistentHashing
)
from app.core.redis_client import redis_client

class LoadBalancerNode:
    def __init__(self, node_id: str):
        self.node_id = node_id
        self.algorithms = {
            "round_robin": RoundRobin(),
            "least_connections": LeastConnections(),
            "weighted_round_robin": WeightedRoundRobin(),
            "consistent_hashing": ConsistentHashing()
        }
        self.current_algo_name = "round_robin"

    def set_algorithm(self, algo_name: str):
        if algo_name in self.algorithms:
            self.current_algo_name = algo_name

    async def handle_request(self, client_ip: Optional[str] = None) -> RequestMetadata:
        servers = server_manager.get_all_servers()
        algo = self.algorithms[self.current_algo_name]
        
        # Consistent hashing uses client_ip or random ID
        request_id = str(uuid.uuid4())
        routing_key = client_ip or request_id
        
        server = algo.select_server(servers, routing_key)
        
        request_meta = RequestMetadata(
            id=request_id,
            lb_node=self.node_id,
            start_time=time.time()
        )

        if not server:
            request_meta.status = "failed"
            request_meta.end_time = time.time()
            self._broadcast_metrics(request_meta)
            return request_meta

        request_meta.server_id = server.id
        
        # Simulate processing
        try:
            server_manager.increment_connections(server.id)
            
            # Simulate network latency + processing time
            processing_time = server.latency + (server.active_connections * 0.01)
            await asyncio.sleep(processing_time)
            
            request_meta.status = "completed"
            request_meta.latency = processing_time
        except Exception as e:
            request_meta.status = "failed"
        finally:
            server_manager.decrement_connections(server.id)
            request_meta.end_time = time.time()
            self._broadcast_metrics(request_meta)

        return request_meta

    def _broadcast_metrics(self, request_meta: RequestMetadata):
        # Publish request metrics to Redis for the dashboard to pick up
        redis_client.publish("simulator:metrics", request_meta.model_dump())
