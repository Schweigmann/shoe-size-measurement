import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  recommendedSize: string;
  onSizeChange: (size: string) => void;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  recommendedSize,
  onSizeChange,
}) => {
  return (
    <div className="relative">
      <select
        value={selectedSize}
        onChange={(e) => onSizeChange(e.target.value)}
        className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3
          focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50
          cursor-pointer text-gray-900 font-medium"
      >
        {sizes.map((size) => (
          <option key={size} value={size}>
            {size} {size === recommendedSize ? '(Recommended)' : ''}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
    </div>
  );
};