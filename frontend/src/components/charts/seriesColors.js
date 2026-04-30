import { theme } from '@/styles/theme';

/** Distinct series colors for per-server visuals (cycles if many backends). */
const PALETTE = [
  theme.accent,
  theme.success,
  theme.warning,
  theme.accentText,
  '#818cf8',
  '#c084fc',
  '#2dd4bf',
  '#fb923c',
];

export function seriesColor(index) {
  return PALETTE[Math.abs(index) % PALETTE.length];
}
