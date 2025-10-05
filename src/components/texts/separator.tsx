import { SeparatorProps } from '@/types/types';
import { TfiLayoutLineSolid } from 'react-icons/tfi';

export default function Separator({ value }: SeparatorProps) {
  return (
    <div className="flex items-center gap-2 text-orange font-semibold">
      <div>
        <TfiLayoutLineSolid className="w-8 h-8" />
      </div>
      <p className="text-lg">{value}</p>
    </div>
  );
}
