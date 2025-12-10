import { ClipLoader } from 'react-spinners';
import { ButtonsProps } from '@/types/ui';
import { cn } from '@/utils/utils';

export default function BlackButton({
  value,
  onClick,
  loading,
  type,
  disabled,
  className,
}: ButtonsProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-full flex items-center justify-center bg-gray-900 text-white font-semibold py-3 px-4 rounded-lg transition duration-300',
        disabled
          ? 'opacity-70 cursor-not-allowed'
          : 'hover:bg-black transform active:scale-95 cursor-pointer',
        className
      )}
    >
      {loading ? <ClipLoader color="#ffffff" size={20} /> : value}
    </button>
  );
}
