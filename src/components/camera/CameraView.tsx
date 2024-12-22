import React, { useEffect, useRef, useState } from 'react';
import { useCamera } from '../../hooks/useCamera';
import { CameraGuide } from './CameraGuide';
import { PermissionRequest } from './PermissionRequest';
import { CameraControls } from './CameraControls';
import { PhotoReview } from '../review/PhotoReview';
import { CalculationPage } from '../calculation/CalculationPage';
import { photoDB } from '../../utils/db';

export const CameraView: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [showCalculation, setShowCalculation] = useState(false);
  
  const { 
    hasPermission,
    isLoading,
    error,
    requestPermission,
    startCamera,
    stopCamera,
    switchCamera,
    capturePhoto 
  } = useCamera(videoRef);

  const handleCapture = async () => {
    try {
      const photoData = await capturePhoto();
      setCapturedPhoto(photoData);
      stopCamera();
      
      if (navigator.vibrate) {
        navigator.vibrate([50, 50, 50]);
      }
    } catch (err) {
      console.error('Failed to capture photo:', err);
    }
  };

  const handleRetake = async () => {
    setCapturedPhoto(null);
    setShowCalculation(false);
    await startCamera();
  };

  const handleConfirm = async () => {
    if (capturedPhoto) {
      try {
        await photoDB.savePhoto(capturedPhoto);
        setShowCalculation(true);
      } catch (err) {
        console.error('Failed to save photo:', err);
      }
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  if (showCalculation && capturedPhoto) {
    return <CalculationPage photoData={capturedPhoto} onBack={handleRetake} />;
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="animate-pulse text-white">Loading camera...</div>
      </div>
    );
  }

  if (!hasPermission) {
    return <PermissionRequest onRequestPermission={requestPermission} error={error} />;
  }

  if (capturedPhoto && !showCalculation) {
    return (
      <PhotoReview
        photoData={capturedPhoto}
        onRetake={handleRetake}
        onConfirm={handleConfirm}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <CameraGuide />
      <CameraControls 
        onSwitchCamera={switchCamera} 
        onClose={stopCamera}
        onCapture={handleCapture}
      />
      {error && (
        <div className="absolute top-4 left-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg">
          {error.userMessage}
        </div>
      )}
    </div>
  );
};