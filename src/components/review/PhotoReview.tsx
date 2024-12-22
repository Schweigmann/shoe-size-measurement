import React from 'react';
import { Check, RotateCcw } from 'lucide-react';
import { MeasurementCanvas } from '../measurement/MeasurementCanvas';

interface PhotoReviewProps {
  photoData: string;
  onRetake: () => void;
  onConfirm: () => void;
}

export const PhotoReview: React.FC<PhotoReviewProps> = ({
  photoData,
  onRetake,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 bg-black">
      {/* Photo Preview with Measurement Canvas */}
      <div className="relative h-full">
        <MeasurementCanvas imageData={photoData} />
        
        {/* Controls */}
        <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
          <div className="flex justify-between items-center max-w-md mx-auto">
            <button
              onClick={onRetake}
              className="flex items-center justify-center px-6 py-3 rounded-2xl 
                bg-white/10 backdrop-blur-md text-white font-medium
                transition-all duration-200 active:scale-95"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              <span>Retake</span>
            </button>

            <button
              onClick={onConfirm}
              className="flex items-center justify-center px-6 py-3 rounded-2xl
                bg-blue-500 text-white font-medium
                transition-all duration-200 active:scale-95"
            >
              <Check className="w-5 h-5 mr-2" />
              <span>Use Photo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};