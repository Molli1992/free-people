import React from 'react';
import { SwitchProps } from '@/types/ui';

export const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className={`block w-14 h-8 rounded-full ${
            checked ? 'bg-cyan-500' : 'bg-gray-600'
          } transition duration-300 ease-in-out`}
        ></div>
        <div
          className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ease-in-out ${
            checked ? 'transform translate-x-6' : 'transform translate-x-0'
          }`}
        ></div>
      </div>
    </label>
  );
};
