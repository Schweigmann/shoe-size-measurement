import React from 'react';
import { Camera } from 'lucide-react';
import { CameraError } from '../../utils/cameraErrors';

interface PermissionRequestProps {
  onRequestPermission: () => void;
  error: CameraError | null;
}

export const PermissionRequest: React.FC<PermissionRequestProps> = ({ 
  onRequestPermission,
  error 
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm mx-auto space-y-8">
        <div className="text-center">
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6
            ${error ? 'bg-red-50' : 'bg-blue-50'}`}>
            <Camera className={`w-10 h-10 ${error ? 'text-red-500' : 'text-blue-500'}`} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {error ? 'Camera Access Error' : 'Camera Access Required'}
          </h2>
          <p className="text-gray-600 text-base max-w-xs mx-auto">
            {error ? error.userMessage : 'We need camera access to measure your shoe size accurately'}
          </p>
        </div>
        
        <button
          onClick={onRequestPermission}
          className={`w-full rounded-2xl px-6 py-4 font-medium text-base
            transition-all duration-200 active:scale-95
            ${error 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
        >
          {error ? 'Try Again' : 'Allow Camera Access'}
        </button>
      </div>
    </div>
  );
}