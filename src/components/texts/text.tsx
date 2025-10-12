import { TextsProps } from '@/types/types';

export default function Text({ value, color }: TextsProps) {
  return (
    <p
      className={`text-base sm:text-lg 
        ${color === 'primary' ? 'text-white' : ''} 
        ${color === 'secondary' ? 'text-darkGray' : ''}`}
    >
      {value}
    </p>
  );
}
