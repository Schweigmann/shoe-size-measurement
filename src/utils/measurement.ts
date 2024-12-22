const PIXELS_PER_CM = 37.795275591; // 96 DPI / 2.54 cm per inch

export const calculateDistance = (point1: { x: number; y: number }, point2: { x: number; y: number }): number => {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

export const pixelsToMetric = (pixels: number): number => {
  return pixels / PIXELS_PER_CM;
};

export const scalePoint = (point: { x: number; y: number }, scale: number) => ({
  x: point.x * scale,
  y: point.y * scale,
});