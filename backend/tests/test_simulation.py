import time

from app.algorithms import RoundRobin
from app.models import Server
from app.simulation import SimulationEngine


def test_step_processes_request_and_increments_total() -> None:
    servers = [Server(0), Server(1)]
    algo = RoundRobin(servers)
    engine = SimulationEngine(servers, algo, request_interval=0.0)
    assert engine.step() in (0, 1)
    assert sum(s.total_requests for s in servers) == 1
    assert all(s.active_connections == 0 for s in servers)


def test_step_no_servers_returns_none() -> None:
    engine = SimulationEngine([], RoundRobin([]))
    assert engine.step() is None


def test_start_stop_allows_interrupt() -> None:
    servers = [Server(0)]
    engine = SimulationEngine(servers, RoundRobin(servers), request_interval=0.01)
    engine.start()
    time.sleep(0.05)
    engine.stop()
    assert not engine._thread or not engine._thread.is_alive()
    assert servers[0].total_requests >= 1
