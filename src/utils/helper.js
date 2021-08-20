/**
 * linear interpolate helper
 * 線性內插公式
 */
export function linearInterpolate(a, b, n) {
  return (1 - n) * a + n * b;
}
