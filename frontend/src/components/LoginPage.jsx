import Link from 'next/link';

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.24 1.26-.96 2.32-2.04 3.04l3.3 2.56C19.36 17.68 21 14.98 21 12c0-.98-.1-1.92-.28-2.82z"
      />
      <path
        fill="#34A853"
        d="M12 21c2.76 0 5.08-.92 6.76-2.48l-3.3-2.56c-.92.62-2.1.98-3.46.98-2.66 0-4.92-1.8-5.74-4.22l-3.42 2.64C6.08 19.08 8.82 21 12 21z"
      />
      <path
        fill="#4A90E2"
        d="M6.26 14.72l-.02-.06-3.42-2.64c-.62 1.24-.98 2.64-.98 4.18 0 1.54.36 2.94.98 4.18z"
      />
      <path fill="#FBBC05" d="M12 6.58c1.38 0 2.62.48 3.6 1.42l2.7-2.7C15.92 3.98 14.08 3 12 3 8.82 3 6.08 4.92 4.84 7.78l3.42 2.64C7.08 8.38 9.34 6.58 12 6.58z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

export default function LoginPage() {
  return (
    <div className="login-root">
      <div className="login-left">
        <Link href="/" className="login-brand">
          <span className="login-logo" aria-hidden>
            ⇄
          </span>
          <span className="login-brand-text">Distributed Load Balancer</span>
        </Link>

        <h1 className="login-h1">Log in</h1>
        <p className="login-sub">Access your load balancer dashboard</p>

        <div className="login-social">
          <button type="button" className="login-social-btn">
            <GoogleIcon /> Continue with Google
          </button>
          <button type="button" className="login-social-btn">
            <GitHubIcon /> Continue with GitHub
          </button>
          <button type="button" className="login-social-btn">
            <AppleIcon /> Continue with Apple
          </button>
        </div>

        <div className="login-or">Or</div>

        <label className="login-label" htmlFor="login-email">
          Email
        </label>
        <input
          id="login-email"
          className="login-input"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
        />

        <Link href="/dashboard" className="login-continue">
          Continue
        </Link>

        <div className="login-footer">
          Don&apos;t have an account? <Link href="/dashboard">Create one</Link>
        </div>
        <p className="login-sso-note">SSO available on Business and Enterprise plans.</p>
      </div>

      <div className="login-right" aria-hidden>
        <div className="login-right-grid" />
        <div className="login-right-glow" />
        <div className="login-diagram">
          <div className="login-hub">⇄</div>
          <div className="login-nodes">
            <div className="login-node">
              <div className="login-dash-line" />
              <span className="login-node-box">Server 1</span>
            </div>
            <div className="login-node">
              <div className="login-dash-line" />
              <span className="login-node-box">Server 2</span>
            </div>
            <div className="login-node">
              <div className="login-dash-line" />
              <span className="login-node-box">Server 3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
