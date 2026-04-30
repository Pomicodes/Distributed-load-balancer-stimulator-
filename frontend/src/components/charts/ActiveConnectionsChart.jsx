'use client';

import { theme } from '@/styles/theme';
import { seriesColor } from './seriesColors';

/**
 * Compare active connections per backend (horizontal bars, max-normalized).
 */
export default function ActiveConnectionsChart({ servers = [] }) {
  const items = servers.map((s, i) => ({
    id: s?.id ?? i,
    active: Math.max(0, Number(s?.active_connections) || 0),
    color: seriesColor(i),
  }));
  const max = Math.max(1, ...items.map((x) => x.active));

  if (items.length === 0) {
    return (
      <figure style={styles.figure} aria-label="Active connections by server">
        <figcaption style={styles.caption}>Active connections by server</figcaption>
        <p style={styles.empty}>
          No server data yet. Per-backend connection counts show here once the API returns a server list.
        </p>
      </figure>
    );
  }

  return (
    <figure style={styles.figure} aria-label="Active connections by server">
      <figcaption style={styles.caption}>Active connections by server</figcaption>
      <ul style={styles.list}>
        {items.map((row) => (
          <li key={String(row.id)} style={styles.row}>
            <span style={styles.label}>#{row.id}</span>
              <div style={styles.barWrap}>
                <div
                  className="chart-bar-fill"
                  style={{
                    ...styles.barFill,
                    width: `${(row.active / max) * 100}%`,
                    minWidth: row.active > 0 ? 2 : 0,
                    background: `linear-gradient(90deg, ${row.color}cc 0%, ${row.color} 40%, ${row.color}ee 100%)`,
                    boxShadow: `0 0 12px ${row.color}55, inset 0 1px 0 rgba(255,255,255,0.18)`,
                  }}
                />
              </div>
            <span style={styles.value}>{row.active}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}

const styles = {
  figure: {
    margin: 0,
    padding: '1rem 1.15rem',
    borderRadius: '0.65rem',
    background: theme.surface,
    border: `1px solid ${theme.border}`,
    boxShadow: theme.shadow,
  },
  caption: {
    margin: '0 0 0.85rem',
    fontSize: '0.8125rem',
    fontWeight: 600,
    color: theme.text,
    letterSpacing: '-0.02em',
  },
  empty: {
    margin: 0,
    fontSize: '0.8125rem',
    color: theme.textMuted,
    lineHeight: 1.45,
  },
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.65rem',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '2.25rem 1fr 2.5rem',
    alignItems: 'center',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.75rem',
    fontWeight: 700,
    color: theme.accentText,
    fontVariantNumeric: 'tabular-nums',
  },
  barWrap: {
    height: 10,
    borderRadius: 5,
    background: theme.accentSoft,
    border: `1px solid ${theme.border}`,
    overflow: 'hidden',
    boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.2)',
  },
  barFill: {
    height: '100%',
    borderRadius: 5,
    transition: 'width 0.55s cubic-bezier(0.33, 1, 0.68, 1)',
  },
  value: {
    fontSize: '0.8125rem',
    fontWeight: 700,
    color: theme.text,
    fontVariantNumeric: 'tabular-nums',
    textAlign: 'right',
  },
};
