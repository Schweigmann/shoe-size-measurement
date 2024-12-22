import React from 'react';
import { Ruler } from 'lucide-react';

interface ActionButtonsProps {
  onAdjustMeasurement: () => void;
  selectedSize: string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onAdjustMeasurement,
  selectedSize,
}) => {
  return (
    <div className="space-y-3 pt-4">
      <button
        className="w-full py-4 bg-blue-600 text-white rounded-2xl font-medium text-lg
          hover:bg-blue-700 transition-colors duration-200"
      >
        Continue with Size {selectedSize}
      </button>
      
      <button
        onClick={onAdjustMeasurement}
        className="w-full py-4 bg-gray-100 text-gray-700 rounded-2xl font-medium
          hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <Ruler className="w-5 h-5" />
        Adjust Measurement
      </button>
    </div>
  );
};