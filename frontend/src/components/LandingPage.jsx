import Link from 'next/link';

function LogoGlyph() {
  return <span aria-hidden>⇄</span>;
}

function SparklineIncoming() {
  return (
    <svg viewBox="0 0 200 48" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="lpGradA" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 38 L20 32 L40 36 L60 22 L80 28 L100 14 L120 20 L140 10 L160 18 L180 8 L200 12 L200 48 L0 48 Z"
        fill="url(#lpGradA)"
      />
      <path
        d="M0 38 L20 32 L40 36 L60 22 L80 28 L100 14 L120 20 L140 10 L160 18 L180 8 L200 12"
        fill="none"
        stroke="#22d3ee"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrafficLines() {
  return (
    <svg viewBox="0 0 400 72" preserveAspectRatio="none" aria-hidden>
      <path
        d="M0 50 Q80 45 160 30 T320 25 L400 18"
        fill="none"
        stroke="#22d3ee"
        strokeWidth="2"
        opacity="0.9"
      />
      <path
        d="M0 58 Q100 48 200 42 T400 35"
        fill="none"
        stroke="#a78bfa"
        strokeWidth="2"
        opacity="0.85"
      />
    </svg>
  );
}

export default function LandingPage() {
  return (
    <div className="lp-root">
      <div className="lp-grid-bg" aria-hidden />
      <div className="lp-glow" aria-hidden />

      <div className="lp-inner">
        <nav className="lp-nav" aria-label="Primary">
          <Link href="/" className="lp-nav-brand">
            <span className="lp-nav-logo">
              <LogoGlyph />
            </span>
            <span className="lp-nav-title">Distributed Load Balancer</span>
          </Link>
          <div className="lp-nav-actions">
            <Link href="/login" className="lp-nav-link-quiet">
              Log in
            </Link>
            <Link href="/dashboard" className="lp-nav-cta">
              Get Started
            </Link>
          </div>
        </nav>

        <header className="lp-hero">
          <div className="lp-badge">
            <span className="lp-badge-dot" />
            Real-time Simulation
          </div>
          <h1 className="lp-h1">
            <span className="lp-h1-line1">Distributed</span>
            <span className="lp-h1-line2">Load Balancer</span>
          </h1>
          <p className="lp-lead">
            Simulate traffic routing across backend servers in real time. Visualize requests, monitor
            load, and optimize performance.
          </p>
          <div className="lp-hero-actions">
            <Link href="/dashboard" className="lp-btn-primary">
              Get Started <span aria-hidden>→</span>
            </Link>
          </div>
        </header>

        <section className="lp-preview" aria-label="Product preview">
          <div className="lp-dash-card">
            <aside className="lp-dash-sidebar" aria-label="Sidebar">
              <span className="lp-dash-icon lp-dash-icon-active" title="Home">
                ⌂
              </span>
              <span className="lp-dash-icon" title="Analytics">
                📊
              </span>
              <span className="lp-dash-icon" title="Network">
                ⧉
              </span>
              <span className="lp-dash-icon" title="Settings">
                ⚙
              </span>
            </aside>

            <div className="lp-dash-main">
              <div className="lp-dash-top">
                <div className="lp-status">
                  <span className="lp-status-live" />
                  <span>Simulation running</span>
                </div>
                <p className="lp-algo">
                  Algorithm: <strong>round-robin</strong> · demo
                </p>
                <div className="lp-dash-controls">
                  <span className="lp-mini-btn lp-mini-btn-teal">Start</span>
                  <span className="lp-mini-btn lp-mini-btn-red">Stop</span>
                  <span className="lp-mini-btn">Refresh</span>
                </div>
              </div>

              <div className="lp-dash-body">
                <div className="lp-panel">
                  <div className="lp-panel-title">Incoming Requests</div>
                  <div className="lp-sparkline">
                    <SparklineIncoming />
                  </div>
                  <div className="lp-incoming-meta">
                    <span className="lp-incoming-val">128</span>
                  </div>
                </div>

                <div className="lp-panel">
                  <div className="lp-panel-title">Traffic (last 30s)</div>
                  <div className="lp-multi-chart">
                    <TrafficLines />
                  </div>
                </div>

                <div className="lp-flow-panel">
                  <div className="lp-flow-hub" aria-hidden>
                    ⇄
                  </div>
                  <div className="lp-flow-servers">
                    <div className="lp-server-card">
                      <div className="lp-server-name">Server 1</div>
                      <div className="lp-server-rps">45 req/s</div>
                      <div className="lp-bar">
                        <div className="lp-bar-fill" />
                      </div>
                    </div>
                    <div className="lp-server-card">
                      <div className="lp-server-name">Server 2</div>
                      <div className="lp-server-rps">38 req/s</div>
                      <div className="lp-bar">
                        <div className="lp-bar-fill" />
                      </div>
                    </div>
                    <div className="lp-server-card">
                      <div className="lp-server-name">Server 3</div>
                      <div className="lp-server-rps">29 req/s</div>
                      <div className="lp-bar">
                        <div className="lp-bar-fill" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lp-dash-stats">
                <div className="lp-stat">
                  <div className="lp-stat-label">Backend Servers</div>
                  <div className="lp-stat-value">3</div>
                </div>
                <div className="lp-stat">
                  <div className="lp-stat-label">Active Connections</div>
                  <div className="lp-stat-value">9</div>
                </div>
                <div className="lp-stat">
                  <div className="lp-stat-label">Total Requests</div>
                  <div className="lp-stat-value">128</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="lp-footer">
          Built for developers · Real-time visualization · Easy to extend
          <div className="lp-footer-login">
            <Link href="/login">Log in to dashboard</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
