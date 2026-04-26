class Server:
    def __init__(self, id):
        self.id = id
        self.active_connections = 0
        self.total_requests = 0

    def handle_request(self):
        self.active_connections += 1
        self.total_requests += 1

    def release_request(self):
        if self.active_connections > 0:
            self.active_connections -= 1