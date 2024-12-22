import React from 'react';

export const CameraGuide: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="relative h-full flex items-center justify-center">
        {/* iOS-style guide frame */}
        <div className="w-4/5 h-2/3 rounded-3xl overflow-hidden">
          {/* Corner guides */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-white/80 rounded-tl-3xl"></div>
            <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-white/80 rounded-tr-3xl"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-white/80 rounded-bl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-white/80 rounded-br-3xl"></div>
          </div>
          
          {/* Center guide text with card outline */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center">
            {/* Card outline */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-48 h-28 border-2 border-dashed border-white/60 rounded-lg"></div>
            
            {/* Text content */}
            <div className="relative backdrop-blur-sm bg-black/20 px-6 py-3 rounded-2xl">
              <p className="text-sm font-medium mb-1">Place your feet against the wall with any standard card</p>
              <p className="text-xs opacity-75">(like library card)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};