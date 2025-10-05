import { TextsProps } from '@/types/types';

export default function SubTitle({ value, color }: TextsProps) {
  return (
    <h1
      className={`text-2xl font-semibold 
        ${color === 'primary' ? 'text-white' : ''} 
        ${color === 'secondary' ? 'text-midnightBlue' : ''}`}
    >
      {value}
    </h1>
  );
}
