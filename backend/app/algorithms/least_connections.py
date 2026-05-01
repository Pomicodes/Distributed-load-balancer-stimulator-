class LeastConnections:
    def __init__(self, servers):
        self.servers = servers

    def get_server(self):
        if not self.servers:
            raise ValueError("LeastConnections requires at least one server")
        return min(self.servers, key=lambda s: s.active_connections)