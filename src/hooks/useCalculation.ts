import { useState, useEffect } from 'react';
import { calculateFootDimensions } from '../utils/footCalculation';

interface CalculationResult {
  length: number;
  width: number;
  recommendedSize: string;
}

export const useCalculation = (photoData: string) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<CalculationResult | null>(null);

  useEffect(() => {
    const analyze = async () => {
      try {
        // Step 1: Process image
        setCurrentStep(0);
        setProgress(25);
        await simulateStep();

        // Step 2: Analyze measurements
        setCurrentStep(1);
        setProgress(50);
        await simulateStep();

        // Step 3: Calculate dimensions
        setCurrentStep(2);
        setProgress(75);
        const dimensions = await calculateFootDimensions(photoData);
        await simulateStep();

        // Step 4: Determine size
        setCurrentStep(3);
        setProgress(100);
        const size = calculateShoeSize(dimensions.length);
        
        setResult({
          length: dimensions.length,
          width: dimensions.width,
          recommendedSize: size
        });
      } catch (error) {
        console.error('Calculation error:', error);
      }
    };

    analyze();
  }, [photoData]);

  return { progress, currentStep, result };
};

// Simulate processing time for better UX
const simulateStep = () => new Promise(resolve => setTimeout(resolve, 1000));

const calculateShoeSize = (lengthCm: number): string => {
  // Basic EU size calculation (simplified)
  const euSize = Math.round((lengthCm + 2) * 1.5);
  return `EU ${euSize}`;
};