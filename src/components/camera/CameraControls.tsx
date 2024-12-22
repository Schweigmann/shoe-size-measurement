import React from 'react';
import { XCircle, RotateCcw } from 'lucide-react';

interface CameraControlsProps {
  onSwitchCamera: () => void;
  onClose: () => void;
  onCapture: () => void;
}

export const CameraControls: React.FC<CameraControlsProps> = ({
  onSwitchCamera,
  onClose,
  onCapture,
}) => {
  return (
    <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
      <div className="flex justify-between items-center max-w-md mx-auto">
        <button
          onClick={onClose}
          className="w-12 h-12 rounded-full flex items-center justify-center 
            text-white backdrop-blur-md bg-white/10
            transition-all duration-200 active:scale-95"
          aria-label="Close camera"
        >
          <XCircle className="w-7 h-7" />
        </button>

        <button
          onClick={onCapture}
          className="relative w-20 h-20 transition-all duration-200 active:scale-95"
          aria-label="Take picture"
        >
          <div className="absolute inset-0 rounded-full border-4 border-white"></div>
          <div className="absolute inset-2 rounded-full bg-white"></div>
        </button>

        <button
          onClick={onSwitchCamera}
          className="w-12 h-12 rounded-full flex items-center justify-center 
            text-white backdrop-blur-md bg-white/10
            transition-all duration-200 active:scale-95"
          aria-label="Switch camera"
        >
          <RotateCcw className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};