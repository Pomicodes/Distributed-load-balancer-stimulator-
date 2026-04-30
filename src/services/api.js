import axios from 'axios';

/**
 * Shared client: all requests use the same base URL and defaults.
 * Override in .env.local with NEXT_PUBLIC_API_URL for other environments.
 */
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

function getErrorMessage(error) {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error ? error.message : 'Unexpected error';
  }
  const data = error.response?.data;
  const detail = data?.detail;
  if (typeof detail === 'string') return detail;
  if (detail != null) return JSON.stringify(detail);
  if (data && typeof data.message === 'string') return data.message;
  if (error.response?.statusText) return error.response.statusText;
  return error.message || 'Request failed';
}

async function getJson(path) {
  try {
    const { data } = await api.get(path);
    return data;
  } catch (error) {
    const wrapped = new Error(getErrorMessage(error));
    if (axios.isAxiosError(error) && error.response) {
      wrapped.status = error.response.status;
      wrapped.data = error.response.data;
    }
    throw wrapped;
  }
}

/** Calls GET /start */
export function startSimulation() {
  return getJson('/start');
}

/** Calls GET /stop */
export function stopSimulation() {
  return getJson('/stop');
}

/** Calls GET /state */
export function getState() {
  return getJson('/state');
}
