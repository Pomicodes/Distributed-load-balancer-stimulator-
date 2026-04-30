from pydantic import BaseModel
from typing import Optional
import time

class Server(BaseModel):
    id: str
    active_connections: int = 0
    max_capacity: int = 100
    latency: float = 0.1 # In seconds
    healthy: bool = True
    weight: int = 1
    failure_probability: float = 0.05
    last_heartbeat: float = 0.0

    def to_redis_dict(self):
        return self.model_dump()

    @classmethod
    def from_redis_dict(cls, data: dict):
        return cls(**data)

class RequestMetadata(BaseModel):
    id: str
    lb_node: str
    server_id: Optional[str] = None
    start_time: float
    end_time: Optional[float] = None
    status: str = "pending" # pending, completed, failed
    latency: float = 0.0