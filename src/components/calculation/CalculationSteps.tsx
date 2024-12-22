import React from 'react';
import { Check, Loader2 } from 'lucide-react';

interface CalculationStepsProps {
  currentStep: number;
}

export const CalculationSteps: React.FC<CalculationStepsProps> = ({ currentStep }) => {
  const steps = [
    'Processing image',
    'Analyzing measurements',
    'Calculating dimensions',
    'Determining size recommendation'
  ];

  return (
    <div className="space-y-3">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center space-x-3">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center
            ${index < currentStep ? 'bg-green-500' : 
              index === currentStep ? 'bg-blue-500' : 'bg-gray-200'}`}>
            {index < currentStep ? (
              <Check className="w-4 h-4 text-white" />
            ) : index === currentStep ? (
              <Loader2 className="w-4 h-4 text-white animate-spin" />
            ) : null}
          </div>
          <span className={`text-sm ${
            index <= currentStep ? 'text-gray-900' : 'text-gray-500'
          }`}>
            {step}
          </span>
        </div>
      ))}
    </div>
  );
};