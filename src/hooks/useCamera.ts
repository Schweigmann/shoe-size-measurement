import { useEffect, useRef, useState } from 'react';
import { useCameraPermissions } from './useCameraPermissions';
import { CameraError, createCameraError } from '../utils/cameraErrors';

interface CameraHook {
  hasPermission: boolean;
  isLoading: boolean;
  error: CameraError | null;
  requestPermission: () => Promise<void>;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  switchCamera: () => void;
  capturePhoto: () => Promise<string>;
}

export const useCamera = (videoRef: React.RefObject<HTMLVideoElement>): CameraHook => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<CameraError | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const streamRef = useRef<MediaStream | null>(null);
  
  const { 
    hasPermission, 
    checkPermission,
    requestCameraPermission,
    resetPermission 
  } = useCameraPermissions();

  const startCamera = async () => {
    try {
      setError(null);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      const constraints = {
        video: {
          facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // Wait for metadata to load before playing
        await new Promise((resolve) => {
          if (videoRef.current) {
            videoRef.current.onloadedmetadata = resolve;
          }
        });
        
        try {
          await videoRef.current.play();
        } catch (playError) {
          console.warn('Play interrupted, retrying...', playError);
          // Add a small delay before retrying
          await new Promise(resolve => setTimeout(resolve, 100));
          await videoRef.current.play();
        }
      }
    } catch (err) {
      const cameraError = createCameraError(err);
      setError(cameraError);
      throw cameraError;
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const capturePhoto = async (): Promise<string> => {
    if (!videoRef.current) {
      throw new Error('Video element not found');
    }

    const canvas = document.createElement('canvas');
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }

    // Flip the image horizontally if using front camera
    if (facingMode === 'user') {
      ctx.scale(-1, 1);
      ctx.translate(-canvas.width, 0);
    }

    ctx.drawImage(video, 0, 0);
    
    // Add haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    return canvas.toDataURL('image/jpeg');
  };

  const switchCamera = async () => {
    stopCamera();
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  const requestPermission = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await requestCameraPermission();
      await startCamera();
    } catch (err) {
      const cameraError = createCameraError(err);
      setError(cameraError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkPermission().finally(() => setIsLoading(false));
    return () => stopCamera();
  }, []);

  useEffect(() => {
    if (hasPermission) {
      startCamera().catch(err => {
        console.error('Failed to start camera:', err);
      });
    }
  }, [facingMode, hasPermission]);

  return {
    hasPermission,
    isLoading,
    error,
    requestPermission,
    startCamera,
    stopCamera,
    switchCamera,
    capturePhoto
  };
};