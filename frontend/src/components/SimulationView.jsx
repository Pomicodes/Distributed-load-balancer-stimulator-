'use client';

import { useState } from 'react';

import { startSimulation, stopSimulation } from '@/services/api';
import { useSimulation } from '@/hooks/useSimulation';
import {
  getAlgorithmFromState,
  getServersFromState,
  isRunningFromState,
  totalActiveAcross,
  totalRequestsAcross,
} from '@/lib/simulationState';
import { theme } from '@/styles/theme';
import Button from '@/components/Button';
import ServerCard from '@/components/ServerCard';

export default function SimulationView() {
  const { data, error, loading, refresh } = useSimulation();
  const [actionBusy, setActionBusy] = useState(false);
  const [actionError, setActionError] = useState(null);

  const servers = getServersFromState(data);
  const running = isRunningFromState(data);
  const algorithm = getAlgorithmFromState(data);
  const totalReq = totalRequestsAcross(servers);
  const totalActive = totalActiveAcross(servers);

  async function handleStart() {
    setActionError(null);
    setActionBusy(true);
    try {
      await startSimulation();
      await refresh();
    } catch (e) {
      setActionError(e instanceof Error ? e.message : 'Start failed');
    } finally {
      setActionBusy(false);
    }
  }

  async function handleStop() {
    setActionError(null);
    setActionBusy(true);
    try {
      await stopSimulation();
      await refresh();
    } catch (e) {
      setActionError(e instanceof Error ? e.message : 'Stop failed');
    } finally {
      setActionBusy(false);
    }
  }

  async function handleRefresh() {
    setActionError(null);
    setActionBusy(true);
    try {
      await refresh();
    } finally {
      setActionBusy(false);
    }
  }

  return (
    <div style={styles.wrapper}>
      <section style={styles.toolbar} aria-label="Simulation controls">
        <div style={styles.statusGroup}>
          <span
            style={{
              ...styles.pill,
              background: running ? theme.successSoft : theme.dangerSoft,
              color: running ? theme.success : theme.danger,
              borderColor: running ? 'rgba(52, 211, 153, 0.35)' : 'rgba(248, 113, 113, 0.35)',
            }}
          >
            <span style={styles.pillDot(running)} aria-hidden />
            {running ? 'Simulation running' : 'Simulation stopped'}
          </span>
          {algorithm != null && (
            <span style={styles.meta}>
              Algorithm: <strong style={styles.metaStrong}>{String(algorithm)}</strong>
            </span>
          )}
        </div>

        <div style={styles.buttons}>
          <Button variant="primary" disabled={actionBusy} onClick={handleStart} title="Start load simulation">
            ▶ Start
          </Button>
          <Button variant="danger" disabled={actionBusy} onClick={handleStop} title="Stop simulation">
            ■ Stop
          </Button>
          <Button variant="ghost" disabled={actionBusy} onClick={handleRefresh} title="Refresh state now">
            ↻ Refresh
          </Button>
        </div>
      </section>

      {(actionError || error) && (
        <div role="alert" style={styles.alert}>
          {actionError || error}
        </div>
      )}

      {loading && !data && (
        <p style={styles.hint}>Connecting to API…</p>
      )}

      <section style={styles.stats} aria-label="Fleet summary">
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Backend servers</span>
          <span style={styles.statValue}>{servers.length}</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Active connections</span>
          <span style={styles.statValue}>{totalActive}</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Total requests (fleet)</span>
          <span style={styles.statValue}>{totalReq}</span>
        </div>
      </section>

      <section aria-label="Server pool">
        <h2 style={styles.sectionTitle}>Server pool</h2>
        {servers.length === 0 ? (
          <div style={styles.empty}>
            No servers returned from <code style={styles.code}>/state</code>. Confirm the backend exposes a{' '}
            <code style={styles.code}>servers</code> array (or adjust normalization in{' '}
            <code style={styles.code}>src/lib/simulationState.js</code>).
          </div>
        ) : (
          <div style={styles.grid}>
            {servers.map((server, i) => (
              <ServerCard key={`${server.id ?? i}-${i}`} server={server} />
            ))}
          </div>
        )}
      </section>

      <p style={styles.footerNote}>
        API polls every second. Backend:{' '}
        <code style={styles.code}>{process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}</code>
      </p>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  toolbar: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    padding: '1rem 1.25rem',
    borderRadius: '0.75rem',
    background: theme.panel,
    border: `1px solid ${theme.border}`,
    boxShadow: theme.shadow,
  },
  statusGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '0.75rem 1rem',
  },
  pill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.45rem',
    padding: '0.35rem 0.85rem',
    borderRadius: '999px',
    fontSize: '0.8125rem',
    fontWeight: 600,
    border: '1px solid',
  },
  pillDot: (on) => ({
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: on ? theme.success : theme.danger,
    boxShadow: on ? `0 0 8px ${theme.success}` : 'none',
  }),
  meta: {
    fontSize: '0.8125rem',
    color: theme.textMuted,
  },
  metaStrong: {
    color: theme.accentText,
    fontWeight: 600,
  },
  buttons: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.65rem',
  },
  alert: {
    padding: '0.85rem 1rem',
    borderRadius: '0.5rem',
    background: theme.dangerSoft,
    border: `1px solid rgba(248, 113, 113, 0.35)`,
    color: theme.danger,
    fontSize: '0.875rem',
  },
  hint: {
    margin: 0,
    color: theme.textMuted,
    fontSize: '0.9rem',
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(10rem, 1fr))',
    gap: '0.85rem',
  },
  statCard: {
    padding: '1rem 1.15rem',
    borderRadius: '0.65rem',
    background: theme.surface,
    border: `1px solid ${theme.border}`,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
  },
  statLabel: {
    fontSize: '0.7rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: theme.textMuted,
  },
  statValue: {
    fontSize: '1.35rem',
    fontWeight: 700,
    color: theme.text,
    fontVariantNumeric: 'tabular-nums',
  },
  sectionTitle: {
    margin: '0 0 0.75rem',
    fontSize: '1rem',
    fontWeight: 600,
    color: theme.text,
    letterSpacing: '-0.02em',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(16rem, 1fr))',
    gap: '1rem',
  },
  empty: {
    padding: '1.25rem',
    borderRadius: '0.65rem',
    background: theme.surface,
    border: `1px dashed ${theme.borderGlow}`,
    color: theme.textMuted,
    fontSize: '0.875rem',
    lineHeight: 1.5,
  },
  code: {
    fontSize: '0.8em',
    padding: '0.12rem 0.35rem',
    borderRadius: '0.3rem',
    background: theme.accentSoft,
    color: theme.accentText,
  },
  footerNote: {
    margin: 0,
    fontSize: '0.75rem',
    color: theme.textMuted,
  },
};
