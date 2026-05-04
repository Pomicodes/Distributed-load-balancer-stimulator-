import asyncio
import random
from app.services.server_manager import server_manager

class FailureSimulator:
    def __init__(self):
        self.is_running = False
        self.task = None

    def start(self):
        if not self.is_running:
            self.is_running = True
            self.task = asyncio.create_task(self._run())

    def stop(self):
        self.is_running = False
        if self.task:
            self.task.cancel()

    async def _run(self):
        while self.is_running:
            servers = server_manager.get_all_servers()
            for server in servers:
                # Random failure check
                if server.healthy and random.random() < (server.failure_probability * 0.01):
                    print(f"FAILURE: Server {server.id} failed!")
                    server.healthy = False
                    server_manager.update_server(server)
                
                # Random recovery check
                elif not server.healthy and random.random() < 0.1: # 10% chance to recover
                    print(f"RECOVERY: Server {server.id} recovered!")
                    server.healthy = True
                    server_manager.update_server(server)
            
            await asyncio.sleep(5) # Check every 5 seconds

failure_simulator = FailureSimulator()
