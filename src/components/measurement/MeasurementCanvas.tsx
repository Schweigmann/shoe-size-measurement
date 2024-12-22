import React, { useRef, useEffect, useState } from 'react';
import { useMeasurementDrawing } from '../../hooks/useMeasurementDrawing';
import { Line } from '../../types/measurement';
import { MEASUREMENT_COLORS } from '../../utils/constants';

interface MeasurementCanvasProps {
  imageData: string;
}

export const MeasurementCanvas: React.FC<MeasurementCanvasProps> = ({ imageData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const {
    lines,
    isDrawing,
    currentLine,
    startDrawing,
    continueDrawing,
    finishDrawing,
  } = useMeasurementDrawing();

  useEffect(() => {
    const image = new Image();
    image.src = imageData;
    image.onload = () => {
      if (canvasRef.current && containerRef.current) {
        const container = containerRef.current;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const scale = Math.min(
          containerWidth / image.width,
          containerHeight / image.height
        );

        setCanvasSize({
          width: image.width * scale,
          height: image.height * scale,
        });
      }
    };
  }, [imageData]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear and draw background image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const image = new Image();
    image.src = imageData;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Draw completed lines
    lines.forEach(line => drawLine(ctx, line));

    // Draw current line if drawing
    if (isDrawing && currentLine) {
      drawLine(ctx, currentLine);
    }
  }, [lines, currentLine, isDrawing, imageData, canvasSize]);

  const drawLine = (ctx: CanvasRenderingContext2D, line: Line) => {
    // Draw line
    ctx.beginPath();
    ctx.moveTo(line.start.x, line.start.y);
    ctx.lineTo(line.end.x, line.end.y);
    ctx.strokeStyle = MEASUREMENT_COLORS.primary;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw endpoints
    [line.start, line.end].forEach(point => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = MEASUREMENT_COLORS.primary;
      ctx.fill();
    });

    // Draw measurement
    const centerX = (line.start.x + line.end.x) / 2;
    const centerY = (line.start.y + line.end.y) / 2;
    const measurement = `${line.measurement.toFixed(2)} cm`;

    ctx.save();
    ctx.fillStyle = 'white';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 4;
    
    const textMetrics = ctx.measureText(measurement);
    const padding = 6;
    const bgWidth = textMetrics.width + padding * 2;
    const bgHeight = 20;
    
    ctx.fillRect(
      centerX - bgWidth / 2,
      centerY - bgHeight / 2,
      bgWidth,
      bgHeight
    );

    ctx.fillStyle = '#000';
    ctx.font = 'bold 12px system-ui';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(measurement, centerX, centerY);
    ctx.restore();
  };

  const getCanvasPoint = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const point = getCanvasPoint(e);
    startDrawing(point);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const point = getCanvasPoint(e);
    continueDrawing(point);
  };

  const handleMouseUp = () => {
    if (isDrawing) {
      finishDrawing();
    }
  };

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center bg-black">
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="max-w-full max-h-full touch-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
};