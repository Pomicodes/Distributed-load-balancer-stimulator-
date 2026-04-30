'use client';

import { useId, useMemo } from 'react';

import { theme } from '@/styles/theme';

import { areaPathUnder, catmullRomToPath, valuesToPoints } from './chartPathUtils';

const W = 400;
const H = 88;
const PAD = 12;
const BASELINE = H - PAD;

function emaSeries(arr, alpha = 0.42) {
  if (!arr.length) return arr;
  const out = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    out.push(alpha * arr[i] + (1 - alpha) * out[i - 1]);
  }
  return out;
}

function SparklineSeries({ values, stroke, fillId, glowId, label, uid }) {
  const smooth = useMemo(() => emaSeries(values.map((v) => Number(v) || 0)), [values]);
  const pts = useMemo(() => valuesToPoints(smooth, W, H, PAD), [smooth]);
  const linePath = useMemo(() => catmullRomToPath(pts), [pts]);
  const firstX = pts[0]?.x ?? PAD;
  const lastX = pts[pts.length - 1]?.x ?? W - PAD;
  const area = useMemo(
    () => areaPathUnder(linePath, firstX, lastX, BASELINE),
    [linePath, firstX, lastX],
  );
  const endPt = pts[pts.length - 1];

  const gridYs = [0.25, 0.5, 0.75].map((t) => PAD + t * (H - 2 * PAD));

  return (
    <svg
      className="fleet-sparkline-svg"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      role="img"
      aria-label={label}
    >
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.35" />
          <stop offset="55%" stopColor={stroke} stopOpacity="0.08" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
        <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {gridYs.map((gy, i) => (
        <line
          key={`g-${uid}-${i}`}
          x1={PAD}
          x2={W - PAD}
          y1={gy}
          y2={gy}
          stroke={theme.border}
          strokeOpacity={0.45}
          strokeWidth={0.5}
          vectorEffect="non-scaling-stroke"
        />
      ))}

      {area ? (
        <path d={area} fill={`url(#${fillId})`} stroke="none">
          <title>{label}</title>
        </path>
      ) : null}

      {linePath ? (
        <>
          <path
            d={linePath}
            fill="none"
            stroke={stroke}
            strokeWidth={2.25}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#${glowId})`}
            vectorEffect="non-scaling-stroke"
            opacity={0.92}
          />
          {endPt ? (
            <circle
              cx={endPt.x}
              cy={endPt.y}
              r={3.5}
              fill={theme.bg}
              stroke={stroke}
              strokeWidth={2}
              className="fleet-sparkline-dot"
            />
          ) : null}
        </>
      ) : null}
    </svg>
  );
}

/**
 * Rolling snapshot trends from poll data: fleet-wide totals over time.
 */
export default function FleetTimelineChart({ history = [] }) {
  const uid = useId().replace(/:/g, '');

  const reqSeries = history.map((h) => Number(h.totalRequests) || 0);
  const actSeries = history.map((h) => Number(h.totalActive) || 0);

  if (history.length < 2) {
    return (
      <figure style={styles.figure} aria-label="Fleet metrics over time">
        <figcaption style={styles.caption}>Fleet activity (live)</figcaption>
        <p style={styles.hint}>Collecting samples… charts need at least two polls (~2s).</p>
      </figure>
    );
  }

  return (
    <figure style={styles.figure} aria-label="Fleet metrics over time">
      <figcaption style={styles.caption}>Fleet activity (live)</figcaption>
      <div style={styles.rows}>
        <div>
          <span style={styles.subLabel}>Total requests (sum) · smoothed</span>
          <SparklineSeries
            values={reqSeries}
            stroke={theme.accent}
            fillId={`fleet-req-fill-${uid}`}
            glowId={`fleet-req-glow-${uid}`}
            label={`Requests trend, ${history.length} samples`}
            uid={`req-${uid}`}
          />
        </div>
        <div>
          <span style={styles.subLabel}>Active connections (sum) · smoothed</span>
          <SparklineSeries
            values={actSeries}
            stroke={theme.success}
            fillId={`fleet-act-fill-${uid}`}
            glowId={`fleet-act-glow-${uid}`}
            label={`Active connections trend, ${history.length} samples`}
            uid={`act-${uid}`}
          />
        </div>
      </div>
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
  hint: {
    margin: 0,
    fontSize: '0.8125rem',
    color: theme.textMuted,
    lineHeight: 1.45,
  },
  rows: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.1rem',
  },
  subLabel: {
    display: 'block',
    fontSize: '0.6875rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: theme.textMuted,
    marginBottom: '0.4rem',
  },
};
