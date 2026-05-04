import hashlib
from typing import List, Optional
from app.models.server import Server

class LoadBalancingAlgorithm:
    def select_server(self, servers: List[Server], request_id: Optional[str] = None) -> Optional[Server]:
        raise NotImplementedError

class RoundRobin(LoadBalancingAlgorithm):
    def __init__(self):
        self.index = 0

    def select_server(self, servers: List[Server], request_id: Optional[str] = None) -> Optional[Server]:
        healthy_servers = [s for s in servers if s.healthy]
        if not healthy_servers:
            return None
        
        server = healthy_servers[self.index % len(healthy_servers)]
        self.index = (self.index + 1) % len(healthy_servers)
        return server

class LeastConnections(LoadBalancingAlgorithm):
    def select_server(self, servers: List[Server], request_id: Optional[str] = None) -> Optional[Server]:
        healthy_servers = [s for s in servers if s.healthy]
        if not healthy_servers:
            return None
        
        return min(healthy_servers, key=lambda s: s.active_connections)

class WeightedRoundRobin(LoadBalancingAlgorithm):
    def __init__(self):
        self.index = 0
        self.current_weight = 0
        self.max_weight = 0
        self.gcd_weight = 1

    def _gcd(self, a, b):
        while b:
            a, b = b, a % b
        return a

    def _get_gcd_and_max(self, servers):
        if not servers: return 1, 0
        weights = [s.weight for s in servers]
        g = weights[0]
        for w in weights[1:]:
            g = self._gcd(g, w)
        return g, max(weights)

    def select_server(self, servers: List[Server], request_id: Optional[str] = None) -> Optional[Server]:
        healthy_servers = [s for s in servers if s.healthy]
        if not healthy_servers:
            return None

        self.gcd_weight, self.max_weight = self._get_gcd_and_max(healthy_servers)
        
        while True:
            self.index = (self.index + 1) % len(healthy_servers)
            if self.index == 0:
                self.current_weight = self.current_weight - self.gcd_weight
                if self.current_weight <= 0:
                    self.current_weight = self.max_weight
                    if self.current_weight == 0:
                        return None
            
            if healthy_servers[self.index].weight >= self.current_weight:
                return healthy_servers[self.index]

class ConsistentHashing(LoadBalancingAlgorithm):
    def __init__(self, replicas=3):
        self.replicas = replicas
        self.ring = {}
        self.sorted_keys = []

    def _hash(self, key):
        return int(hashlib.md5(key.encode('utf-8')).hexdigest(), 16)

    def _update_ring(self, servers):
        self.ring = {}
        for server in servers:
            for i in range(self.replicas):
                key = self._hash(f"{server.id}:{i}")
                self.ring[key] = server
        self.sorted_keys = sorted(self.ring.keys())

    def select_server(self, servers: List[Server], request_id: Optional[str] = None) -> Optional[Server]:
        healthy_servers = [s for s in servers if s.healthy]
        if not healthy_servers:
            return None

        self._update_ring(healthy_servers)
        if not self.sorted_keys:
            return None

        if not request_id:
            request_id = "default"
            
        hash_val = self._hash(request_id)
        for key in self.sorted_keys:
            if hash_val <= key:
                return self.ring[key]
        
        return self.ring[self.sorted_keys[0]]
