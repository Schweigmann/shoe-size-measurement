import React from 'react';

interface MeasurementDisplayProps {
  length: number;
  width: number;
}

export const MeasurementDisplay: React.FC<MeasurementDisplayProps> = ({ length, width }) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-gray-50 rounded-xl p-4 text-center">
        <p className="text-xl font-semibold text-gray-900 mb-1">{length.toFixed(1)} cm</p>
        <span className="text-sm text-gray-500">Length</span>
      </div>
      <div className="bg-gray-50 rounded-xl p-4 text-center">
        <p className="text-xl font-semibold text-gray-900 mb-1">{width.toFixed(1)} cm</p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm text-gray-500">Width</span>
          <span className="text-xs px-2 py-0.5 bg-gray-200 rounded-full text-gray-600">Normal</span>
        </div>
      </div>
    </div>
  );
};