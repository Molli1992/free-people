import { ClipLoader } from 'react-spinners';
import { ButtonsProps } from '@/types/ui';
import { cn } from '@/utils/utils';

export default function GrayButton({
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
        'w-full flex items-center justify-center bg-gray-200 text-gray-700 py-3 px-4 rounded-lg transition duration-300',
        disabled
          ? 'opacity-70 cursor-not-allowed'
          : 'hover:bg-gray-300 hover:text-gray-800 transform active:scale-95 cursor-pointer',
        className
      )}
    >
      {loading ? <ClipLoader color="#ffffff" size={20} /> : value}
    </button>
  );
}
