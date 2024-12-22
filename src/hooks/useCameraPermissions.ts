import { useState } from 'react';
import { CameraError, createCameraError } from '../utils/cameraErrors';

interface CameraPermissionsHook {
  hasPermission: boolean;
  checkPermission: () => Promise<void>;
  requestCameraPermission: () => Promise<void>;
  resetPermission: () => void;
}

export const useCameraPermissions = (): CameraPermissionsHook => {
  const [hasPermission, setHasPermission] = useState(false);

  const checkPermission = async () => {
    try {
      const result = await navigator.permissions.query({ name: 'camera' as PermissionName });
      setHasPermission(result.state === 'granted');
      
      result.addEventListener('change', () => {
        setHasPermission(result.state === 'granted');
      });
    } catch (err) {
      console.error('Error checking camera permission:', err);
      setHasPermission(false);
    }
  };

  const requestCameraPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setHasPermission(true);
    } catch (err) {
      setHasPermission(false);
      throw createCameraError(err);
    }
  };

  const resetPermission = () => {
    setHasPermission(false);
  };

  return {
    hasPermission,
    checkPermission,
    requestCameraPermission,
    resetPermission
  };
};