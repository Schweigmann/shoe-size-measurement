export interface CameraError {
  code: string;
  message: string;
  userMessage: string;
}

export const createCameraError = (error: any): CameraError => {
  const baseError: CameraError = {
    code: 'UNKNOWN_ERROR',
    message: error?.message || 'An unknown error occurred',
    userMessage: 'Unable to access camera'
  };

  if (error?.name === 'NotAllowedError' || error?.name === 'PermissionDeniedError') {
    return {
      code: 'PERMISSION_DENIED',
      message: 'Camera permission was denied',
      userMessage: 'Please allow camera access to measure your shoe size'
    };
  }

  if (error?.name === 'NotFoundError') {
    return {
      code: 'NO_CAMERA',
      message: 'No camera device found',
      userMessage: 'No camera detected on your device'
    };
  }

  if (error?.name === 'NotReadableError' || error?.name === 'TrackStartError') {
    return {
      code: 'HARDWARE_ERROR',
      message: 'Camera hardware error',
      userMessage: 'Unable to access your camera. Please try again'
    };
  }

  return baseError;
};