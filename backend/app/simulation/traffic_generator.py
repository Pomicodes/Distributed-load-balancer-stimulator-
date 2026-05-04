import asyncio
import random
import numpy as np
from typing import Optional
from app.core.config import settings

class TrafficGenerator:
    def __init__(self):
        self.is_running = False
        self.pattern = "constant" # constant, burst, poisson
        self.rate = settings.TRAFFIC_RATE # requests per second
        self.task: Optional[asyncio.Task] = None
        self.lb_node = None

    def set_lb_node(self, lb_node):
        self.lb_node = lb_node

    def start(self, pattern: str = "constant", rate: int = 10):
        if not self.is_running:
            self.is_running = True
            self.pattern = pattern
            self.rate = rate
            self.task = asyncio.create_task(self._run())

    def stop(self):
        self.is_running = False
        if self.task:
            self.task.cancel()

    async def _run(self):
        while self.is_running:
            if self.pattern == "constant":
                delay = 1.0 / self.rate
                await self._send_request()
                await asyncio.sleep(delay)
            
            elif self.pattern == "burst":
                # Send a burst of requests, then wait
                burst_size = random.randint(5, 20)
                for _ in range(burst_size):
                    await self._send_request()
                await asyncio.sleep(2.0) # Wait between bursts
            
            elif self.pattern == "poisson":
                # Poisson distribution for inter-arrival times
                delay = np.random.exponential(1.0 / self.rate)
                await self._send_request()
                await asyncio.sleep(delay)

    async def _send_request(self):
        # We fire and forget the request to simulate concurrency
        if self.lb_node:
            asyncio.create_task(self.lb_node.handle_request())

traffic_generator = TrafficGenerator()
