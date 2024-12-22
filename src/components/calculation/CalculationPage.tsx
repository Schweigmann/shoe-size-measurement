import React, { useState } from 'react';
import { ProgressBar } from './ProgressBar';
import { CalculationSteps } from './CalculationSteps';
import { useCalculation } from '../../hooks/useCalculation';
import { SizeSelector } from './SizeSelector';
import { MeasurementDisplay } from './MeasurementDisplay';
import { RecommendationMessage } from './RecommendationMessage';
import { Check, Ruler } from 'lucide-react';

interface CalculationPageProps {
  photoData: string;
  onBack: () => void;
}

export const CalculationPage: React.FC<CalculationPageProps> = ({ photoData, onBack }) => {
  const { progress, currentStep, result } = useCalculation(photoData);
  const [selectedSize, setSelectedSize] = useState(result?.recommendedSize || '');

  if (result) {
    return (
      <div className="fixed inset-0 bg-white overflow-y-auto">
        <div className="min-h-screen flex flex-col max-w-md mx-auto px-4 py-6">
          {/* Top Section (Above Fold) */}
          <div className="flex-shrink-0 space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h1 className="text-2xl font-semibold text-gray-900">Perfect Fit Found!</h1>
              <p className="text-gray-600 mt-1">Based on your measurements</p>
            </div>

            <div className="bg-green-50 rounded-2xl p-5 text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Your Recommended Size: {result.recommendedSize}
              </h2>
              <p className="text-gray-600 text-sm">
                This size provides the optimal fit for your foot measurements
              </p>
            </div>

            <MeasurementDisplay length={result.length} width={result.width} />

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Select Your Size
              </label>
              <SizeSelector
                sizes={generateSizeRange(result.recommendedSize)}
                selectedSize={selectedSize || result.recommendedSize}
                recommendedSize={result.recommendedSize}
                onSizeChange={setSelectedSize}
              />
            </div>

            {/* Primary CTA */}
            <button 
              onClick={() => {}} 
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-medium
                transition-all duration-200 hover:bg-blue-700 active:scale-[0.98]"
            >
              Continue with Size {selectedSize || result.recommendedSize}
            </button>

            {/* Tertiary CTA */}
            <button
              onClick={onBack}
              className="w-full text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <Ruler className="w-4 h-4" />
              Adjust measurement
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Loading State
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Your Foot Size</h1>
          <p className="text-gray-600">Please wait while we process your measurements</p>
        </div>

        <div className="space-y-6">
          <ProgressBar progress={progress} />
          <CalculationSteps currentStep={currentStep} />
        </div>
      </div>
    </div>
  );
};

const generateSizeRange = (recommendedSize: string): string[] => {
  const baseSize = parseInt(recommendedSize.replace('EU ', ''));
  return Array.from({ length: 7 }, (_, i) => `EU ${baseSize - 3 + i}`);
};