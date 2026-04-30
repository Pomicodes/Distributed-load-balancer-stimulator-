'use client';

import { theme } from '@/styles/theme';
import { seriesColor } from './seriesColors';

function toHighlight(hex) {
  return `${hex}dd`;
}

function toShadow(hex) {
  return `${hex}99`;
}

/**
 * Horizontal stacked bar: each backend’s share of total routed requests.
 */
export default function RequestDistributionChart({ servers = [] }) {
  const items = servers.map((s, i) => ({
    id: s?.id ?? i,
    value: Math.max(0, Number(s?.total_requests) || 0),
    color: seriesColor(i),
  }));
  const total = items.reduce((sum, x) => sum + x.value, 0);

  if (items.length === 0) {
    return (
      <figure style={styles.figure} aria-label="Request distribution across backends">
        <figcaption style={styles.caption}>Request share by server</figcaption>
        <p style={styles.empty}>
          No server data yet. When <code style={styles.code}>/state</code> includes backends, distribution appears here.
        </p>
      </figure>
    );
  }

  return (
    <figure style={styles.figure} aria-label="Request distribution across backends">
      <figcaption style={styles.caption}>Request share by server</figcaption>
      {total === 0 ? (
        <p style={styles.empty}>No requests recorded yet — start the simulation to see distribution.</p>
      ) : (
        <>
          <div style={styles.track} className="request-dist-track" role="img" aria-hidden>
            {items.map((seg) => {
              const pct = (seg.value / total) * 100;
              if (pct <= 0) return null;
              return (
                <div
                  key={String(seg.id)}
                  className="request-dist-segment"
                  style={{
                    ...styles.segment,
                    width: `${pct}%`,
                    background: `linear-gradient(180deg, ${toHighlight(seg.color)} 0%, ${seg.color} 45%, ${toShadow(seg.color)} 100%)`,
                    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.12), 0 0 14px ${seg.color}44`,
                  }}
                  title={`Server ${seg.id}: ${pct.toFixed(1)}%`}
                />
              );
            })}
          </div>
          <ul style={styles.legend}>
            {items.map((seg) => {
              const pct = total > 0 ? (seg.value / total) * 100 : 0;
              return (
                <li key={`leg-${seg.id}`} style={styles.legendItem}>
                  <span style={styles.swatch(seg.color)} aria-hidden />
                  <span style={styles.legendLabel}>Server {seg.id}</span>
                  <span style={styles.legendVal}>
                    {seg.value} <span style={styles.legendPct}>({pct.toFixed(1)}%)</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </>
      )}
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
  track: {
    display: 'flex',
    width: '100%',
    height: 16,
    borderRadius: 8,
    overflow: 'hidden',
    background: theme.accentSoft,
    border: `1px solid ${theme.border}`,
    boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.25)',
  },
  segment: {
    height: '100%',
    minWidth: 3,
    transition: 'width 0.55s cubic-bezier(0.33, 1, 0.68, 1)',
    position: 'relative',
  },
  legend: {
    listStyle: 'none',
    margin: '0.85rem 0 0',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.45rem',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.8125rem',
    color: theme.textMuted,
  },
  swatch: (c) => ({
    width: 10,
    height: 10,
    borderRadius: 2,
    background: c,
    flexShrink: 0,
  }),
  legendLabel: { flex: '1 1 auto', minWidth: 0 },
  legendVal: {
    fontVariantNumeric: 'tabular-nums',
    color: theme.text,
    fontWeight: 600,
  },
  legendPct: { color: theme.textMuted, fontWeight: 500 },
  code: {
    fontSize: '0.85em',
    padding: '0.1rem 0.35rem',
    borderRadius: '0.25rem',
    background: theme.accentSoft,
    color: theme.accentText,
  },
};
