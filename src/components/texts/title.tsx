import { TextsProps } from '@/types/types';

export default function Title({ value, color }: TextsProps) {
  return (
    <h1
      className={`text-4xl sm:text-5xl font-bold 
        ${color === 'primary' ? 'text-white' : ''} 
        ${color === 'secondary' ? 'text-midnightBlue' : ''}`}
    >
      {value}
    </h1>
  );
}
