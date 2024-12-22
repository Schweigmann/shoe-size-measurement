import React from 'react';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="space-y-2">
      <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="absolute h-full bg-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-right">
        <span className="text-sm font-medium text-gray-500">{Math.round(progress)}%</span>
      </div>
    </div>
  );
};