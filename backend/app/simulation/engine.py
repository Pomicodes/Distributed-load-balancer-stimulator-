from __future__ import annotations

import threading
import time
from collections.abc import Callable
from typing import Optional

class SimulationEngine:
    def __init__(
        self,
        servers,
        algorithm,
        *,
        request_interval: float = 0.5,
        on_request: Optional[Callable] = None,
    ):
        self.servers = servers
        self.algorithm = algorithm
        self.request_interval = request_interval
        self.on_request = on_request
        self.running = False
        self._thread: Optional[threading.Thread] = None

    def step(self) -> Optional[int]:
        """Run one request: pick server, hold connection, release. Returns server id, or None if no servers."""
        if not self.servers:
            return None
        server = self.algorithm.get_server()
        server.handle_request()
        if self.on_request:
            self.on_request(server)
        time.sleep(self.request_interval)
        server.release_request()
        return server.id

    def start(self) -> None:
        """Run the simulation loop in a background thread so stop() can interrupt it."""

        def _loop() -> None:
            while self.running:
                if self.step() is None:
                    break

        self.running = True
        self._thread = threading.Thread(target=_loop, daemon=True)
        self._thread.start()

    def stop(self) -> None:
        self.running = False
        if self._thread and self._thread.is_alive():
            self._thread.join(timeout=2.0)
        self._thread = None