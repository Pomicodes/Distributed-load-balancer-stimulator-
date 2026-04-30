import { theme } from '@/styles/theme';

/**
 * App shell: title, tagline, gradient background (network / traffic theme).
 */
export default function Dashboard({
  title = 'Distributed load balancer',
  subtitle = 'Simulate traffic routing across backend servers in real time.',
  children,
  className = '',
}) {
  return (
    <div className={className} style={styles.root}>
      <div style={styles.gridBg} aria-hidden />
      <header style={styles.header}>
        <div style={styles.headerRow}>
          <div style={styles.brandMark} aria-hidden>
            <span style={styles.brandIcon}>⇄</span>
          </div>
          <div>
            <h1 style={styles.title}>{title}</h1>
            <p style={styles.subtitle}>{subtitle}</p>
          </div>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.container}>{children}</div>
      </main>
    </div>
  );
}

const styles = {
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    background: theme.bgGradient,
    color: theme.text,
    overflow: 'hidden',
  },
  gridBg: {
    position: 'absolute',
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(34, 211, 238, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(34, 211, 238, 0.03) 1px, transparent 1px)
    `,
    backgroundSize: '48px 48px',
    pointerEvents: 'none',
  },
  header: {
    position: 'relative',
    zIndex: 1,
    padding: '1.25rem clamp(1rem, 4vw, 2rem)',
    borderBottom: `1px solid ${theme.border}`,
    background: 'rgba(7, 11, 18, 0.65)',
    backdropFilter: 'blur(12px)',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    maxWidth: '72rem',
    margin: '0 auto',
  },
  brandMark: {
    width: '2.75rem',
    height: '2.75rem',
    borderRadius: '0.65rem',
    background: theme.accentSoft,
    border: `1px solid ${theme.borderGlow}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    boxShadow: `0 0 24px rgba(34, 211, 238, 0.12)`,
  },
  brandIcon: {
    fontSize: '1.35rem',
    color: theme.accent,
    lineHeight: 1,
  },
  title: {
    margin: 0,
    fontSize: 'clamp(1.35rem, 3vw, 1.65rem)',
    fontWeight: 700,
    letterSpacing: '-0.03em',
    lineHeight: 1.2,
    background: `linear-gradient(90deg, ${theme.text} 0%, ${theme.accentText} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    margin: '0.35rem 0 0',
    fontSize: '0.9rem',
    color: theme.textMuted,
    maxWidth: '36rem',
    lineHeight: 1.45,
  },
  main: {
    flex: 1,
    padding: 'clamp(1rem, 3vw, 2rem)',
    position: 'relative',
    zIndex: 1,
  },
  container: {
    maxWidth: '72rem',
    margin: '0 auto',
    width: '100%',
  },
};
