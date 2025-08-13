export function roundNumber(value: number, precision = 2): number {
  return +(Math.ceil(value * 100) / 100).toFixed(precision);
}
