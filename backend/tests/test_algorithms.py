import pytest

from app.algorithms import LeastConnections, RoundRobin
from app.models import Server


def test_round_robin_cycles_servers() -> None:
    servers = [Server(i) for i in range(3)]
    rr = RoundRobin(servers)
    order = [rr.get_server().id for _ in range(6)]
    assert order == [0, 1, 2, 0, 1, 2]


def test_round_robin_empty_raises() -> None:
    with pytest.raises(ValueError, match="at least one server"):
        RoundRobin([]).get_server()


def test_least_connections_picks_min_active() -> None:
    servers = [Server(i) for i in range(3)]
    servers[1].active_connections = 1
    servers[2].active_connections = 2
    lc = LeastConnections(servers)
    assert lc.get_server().id == 0


def test_least_connections_tie_breaks_by_first() -> None:
    servers = [Server(0), Server(1)]
    lc = LeastConnections(servers)
    # Equal active_connections -> min() returns first in list order
    assert lc.get_server().id == 0


def test_least_connections_empty_raises() -> None:
    with pytest.raises(ValueError, match="at least one server"):
        LeastConnections([]).get_server()
