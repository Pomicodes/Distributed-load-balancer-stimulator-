/**
 * Normalize GET /state payloads from different backend shapes.
 */
export function getServersFromState(data) {
  if (data == null) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.servers)) return data.servers;
  if (Array.isArray(data.backend)) return data.backend;
  if (Array.isArray(data.backend_servers)) return data.backend_servers;
  return [];
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
