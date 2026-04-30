/**
 * @param {number[]} values
 * @param {number} W
 * @param {number} H
 * @param {number} pad
 */
export function valuesToPoints(values, W, H, pad) {
  const n = values.length;
  const maxV = Math.max(...values, 1e-6);
  return values.map((v, i) => ({
    x: pad + (n === 1 ? (W - 2 * pad) / 2 : (i / (n - 1)) * (W - 2 * pad)),
    y: pad + (H - 2 * pad) * (1 - v / maxV),
  }));
}

/** Smooth line through points (Catmull-Rom → cubic Bézier). */
export function catmullRomToPath(points) {
  if (points.length < 2) return '';
  if (points.length === 2) {
    const [a, b] = points;
    return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
  }
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

/**
 * Closed path for a filled area under the line down to y = baselineY.
 */
export function areaPathUnder(linePath, firstX, lastX, baselineY) {
  if (!linePath) return '';
  return `${linePath} L ${lastX} ${baselineY} L ${firstX} ${baselineY} Z`;
}
