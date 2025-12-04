import { ClipLoader } from 'react-spinners';
import { ButtonsProps } from '@/types/ui';

export default function RedButton({
  value,
  onClick,
  loading,
  type,
  disabled,
}: ButtonsProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center font-semibold bg-orange text-lg text-white px-4 py-2 rounded-md w-fit ${
        disabled
          ? 'opacity-70 cursor-not-allowed'
          : 'hover:bg-secondary-darkBlue cursor-pointer'
      }`}
    >
      {loading ? <ClipLoader color="#ffffff" size={25} /> : value}
    </button>
  );
}
