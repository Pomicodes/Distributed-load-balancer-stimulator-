import { theme } from '@/styles/theme';

/**
 * Backend server metrics — styled for traffic / infra dashboard (cyan rail).
 */
export default function ServerCard({ server, className = '' }) {
  if (server == null) {
    return null;
  }

  const id = server.id ?? '—';
  const active = server.active_connections ?? 0;
  const total = server.total_requests ?? 0;

  return (
    <article aria-label={`Server ${String(id)}`} className={className} style={styles.card}>
      <div style={styles.rail} aria-hidden />
      <header style={styles.head}>
        <h2 style={styles.heading}>Backend</h2>
        <span style={styles.badge}>#{String(id)}</span>
      </header>

      <dl style={styles.metrics}>
        <div style={styles.row}>
          <dt style={styles.dt}>Active connections</dt>
          <dd style={styles.dd}>{active}</dd>
        </div>
        <div style={styles.row}>
          <dt style={styles.dt}>Total requests</dt>
          <dd style={styles.dd}>{total}</dd>
        </div>
      </dl>
    </article>
  );
}

const styles = {
  card: {
    position: 'relative',
    overflow: 'hidden',
    border: `1px solid ${theme.border}`,
    borderRadius: '0.65rem',
    background: theme.surface,
    padding: '1rem 1rem 1rem 1.15rem',
    boxShadow: theme.shadow,
    transition: 'border-color 0.15s ease, transform 0.15s ease',
  },
  rail: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    background: `linear-gradient(180deg, ${theme.accent} 0%, #0891b2 100%)`,
    opacity: 0.95,
    boxShadow: `0 0 12px rgba(34, 211, 238, 0.35)`,
  },
  head: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.75rem',
    marginBottom: '1rem',
    paddingBottom: '0.75rem',
    borderBottom: `1px solid ${theme.border}`,
    marginLeft: 2,
  },
  heading: {
    margin: 0,
    fontSize: '0.6875rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    color: theme.textMuted,
  },
  badge: {
    fontSize: '0.875rem',
    fontWeight: 700,
    color: theme.accentText,
    fontVariantNumeric: 'tabular-nums',
  },
  metrics: {
    margin: 0,
    display: 'grid',
    gap: '0.75rem',
    marginLeft: 2,
  },
  row: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: '1rem',
  },
  dt: {
    margin: 0,
    fontSize: '0.8125rem',
    color: theme.textMuted,
  },
  dd: {
    margin: 0,
    fontSize: '1.05rem',
    fontWeight: 700,
    color: theme.text,
    fontVariantNumeric: 'tabular-nums',
  },
};
