class RoundRobin:
    def __init__(self, servers):
        self.servers = servers
        self._index = 0

    def get_server(self):
        if not self.servers:
            raise ValueError("RoundRobin requires at least one server")
        server = self.servers[self._index]
        self._index = (self._index + 1) % len(self.servers)
        return server
