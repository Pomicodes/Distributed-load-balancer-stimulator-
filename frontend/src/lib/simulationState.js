/**
 * Normalize GET /state payloads from different backend shapes.
 */

function normalizeServerRecord(s, index) {
  if (s == null || typeof s !== 'object') return null;
  const id = s.id ?? s.server_id ?? s.serverId ?? index;
  const active = s.active_connections ?? s.activeConnections ?? s.active ?? 0;
  const total = s.total_requests ?? s.totalRequests ?? s.requests ?? 0;
  return {
    ...s,
    id,
    active_connections: Number(active) || 0,
    total_requests: Number(total) || 0,
  };
}

export function getServersFromState(data) {
  let raw = [];
  if (data == null) return [];
  if (Array.isArray(data)) raw = data;
  else if (Array.isArray(data.servers)) raw = data.servers;
  else if (Array.isArray(data.backend)) raw = data.backend;
  else if (Array.isArray(data.backend_servers)) raw = data.backend_servers;
  else if (Array.isArray(data.backends)) raw = data.backends;
  else if (Array.isArray(data.pool)) raw = data.pool;
  if (!Array.isArray(raw)) return [];
  return raw.map(normalizeServerRecord).filter(Boolean);
}

export function isRunningFromState(data) {
  if (data == null) return false;
  if (typeof data.running === 'boolean') return data.running;
  if (typeof data.is_running === 'boolean') return data.is_running;
  if (data.status === 'running' || data.state === 'running') return true;
  return false;
}

export function getAlgorithmFromState(data) {
  if (data == null) return null;
  return data.algorithm ?? data.algorithm_name ?? data.lb_algorithm ?? null;
}

export function totalRequestsAcross(servers) {
  return servers.reduce((sum, s) => sum + (Number(s?.total_requests) || 0), 0);
}

export function totalActiveAcross(servers) {
  return servers.reduce((sum, s) => sum + (Number(s?.active_connections) || 0), 0);
}
