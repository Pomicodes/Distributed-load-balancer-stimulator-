/**
 * Deterministic fake fleet for chart/demo mode when the API is offline.
 */

export function initialDemoServers() {
  return [
    { id: 1, active_connections: 3, total_requests: 42 },
    { id: 2, active_connections: 2, total_requests: 38 },
    { id: 3, active_connections: 5, total_requests: 45 },
  ];
}

/**
 * @param {Array<{ id?: unknown; active_connections?: number; total_requests?: number }>} prev
 * @param {{ current: number }} rrRef
 */
export function stepDemoServers(prev, rrRef) {
  const next = prev.map((s) => ({
    id: s.id,
    active_connections: s.active_connections,
    total_requests: s.total_requests,
  }));
  const n = next.length;
  if (n === 0) return prev;

  for (let i = 0; i < n; i++) {
    if (Math.random() < 0.35 && next[i].active_connections > 0) {
      next[i].active_connections -= 1;
    }
  }

  const i = rrRef.current % n;
  rrRef.current += 1;
  const burst = 1 + Math.floor(Math.random() * 3);
  next[i].total_requests += burst;
  next[i].active_connections = Math.min(
    14,
    next[i].active_connections + 1 + Math.floor(Math.random() * 2),
  );

  return next;
}
