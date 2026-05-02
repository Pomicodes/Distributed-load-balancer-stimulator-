from typing import List, Dict, Optional
from app.core.redis_client import redis_client
from app.models.server import Server
import json

class ServerManager:
    SERVERS_KEY = "simulator:servers"
    
    @classmethod
    def get_all_servers(cls) -> List[Server]:
        servers_data = redis_client.hgetall(cls.SERVERS_KEY)
        return [Server.from_redis_dict(data) for data in servers_data.values()]

    @classmethod
    def get_server(cls, server_id: str) -> Optional[Server]:
        data = redis_client.hget(cls.SERVERS_KEY, server_id)
        if data:
            return Server.from_redis_dict(data)
        return None

    @classmethod
    def update_server(cls, server: Server):
        redis_client.hset(cls.SERVERS_KEY, server.id, server.to_redis_dict())

    @classmethod
    def initialize_servers(cls, num_servers: int):
        for i in range(1, num_servers + 1):
            server_id = f"server-{i}"
            if not cls.get_server(server_id):
                server = Server(id=server_id)
                cls.update_server(server)

    @classmethod
    def increment_connections(cls, server_id: str):
        server = cls.get_server(server_id)
        if server:
            server.active_connections += 1
            cls.update_server(server)

    @classmethod
    def decrement_connections(cls, server_id: str):
        server = cls.get_server(server_id)
        if server and server.active_connections > 0:
            server.active_connections -= 1
            cls.update_server(server)

server_manager = ServerManager()
