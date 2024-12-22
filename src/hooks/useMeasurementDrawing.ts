import { useState, useCallback } from 'react';
import { Point, Line } from '../types/measurement';
import { calculateDistance, pixelsToMetric } from '../utils/measurement';

export const useMeasurementDrawing = () => {
  const [lines, setLines] = useState<Line[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentLine, setCurrentLine] = useState<Line | null>(null);

  const startDrawing = useCallback((point: Point) => {
    if (lines.length >= 2) {
      setLines([]);
    }
    
    setIsDrawing(true);
    const newLine: Line = {
      start: point,
      end: point,
      measurement: 0
    };
    setCurrentLine(newLine);
  }, [lines]);

  const continueDrawing = useCallback((point: Point) => {
    if (!isDrawing || !currentLine) return;

    const distanceInPixels = calculateDistance(currentLine.start, point);
    const measurement = pixelsToMetric(distanceInPixels);

    setCurrentLine({
      ...currentLine,
      end: point,
      measurement
    });
  }, [isDrawing, currentLine]);

  const finishDrawing = useCallback(() => {
    if (!currentLine) return;

    setLines(prev => [...prev, currentLine]);
    setCurrentLine(null);
    setIsDrawing(false);
  }, [currentLine]);

  return {
    lines,
    isDrawing,
    currentLine,
    startDrawing,
    continueDrawing,
    finishDrawing
  };
};