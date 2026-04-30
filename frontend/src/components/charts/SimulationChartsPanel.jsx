'use client';

import { theme } from '@/styles/theme';

import ActiveConnectionsChart from './ActiveConnectionsChart';
import FleetTimelineChart from './FleetTimelineChart';
import RequestDistributionChart from './RequestDistributionChart';

const MAX_HISTORY = 60;

/**
 * Dashboard panel: request mix, per-server load, and rolling fleet trends.
 * Pass `history` from the parent (append on each `/state` poll).
 */
export default function SimulationChartsPanel({ servers = [], history = [] }) {
  return (
    <section
      aria-label="Traffic charts"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        color: theme.text,
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: '1rem',
          fontWeight: 600,
          letterSpacing: '-0.02em',
          color: theme.text,
        }}
      >
        Traffic and distribution
      </h2>
      <div
        style={{
          display: 'grid',
          gap: '1rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(17rem, 1fr))',
        }}
      >
        <RequestDistributionChart servers={servers} />
        <ActiveConnectionsChart servers={servers} />
        <div style={{ gridColumn: history.length >= 2 ? '1 / -1' : undefined }}>
          <FleetTimelineChart history={history} />
        </div>
      </div>
    </section>
  );
}

export { MAX_HISTORY };
