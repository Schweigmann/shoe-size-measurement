import React from 'react';
import { Check } from 'lucide-react';

interface RecommendationMessageProps {
  recommendedSize: string;
}

export const RecommendationMessage: React.FC<RecommendationMessageProps> = ({ recommendedSize }) => {
  return (
    <div className="bg-green-50 rounded-2xl p-6 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Your Recommended Size: {recommendedSize}
      </h2>
      <p className="text-gray-600">
        This size provides the optimal fit for your foot measurements
      </p>
    </div>
  );
};