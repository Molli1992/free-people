import { TextsProps } from '@/types/ui';

export default function SubTitle({ value, color }: TextsProps) {
  return (
    <h1
      className={`text-xl sm:text-2xl font-semibold 
        ${color === 'primary' ? 'text-white' : ''} 
        ${color === 'secondary' ? 'text-midnightBlue' : ''}`}
    >
      {value}
    </h1>
  );
}
