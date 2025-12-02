import { ClipLoader } from 'react-spinners';
import { ButtonsProps } from '@/types/types';

export default function BlackButton({
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
      className="w-full flex items-center justify-center bg-gray-900 hover:bg-black text-white font-semibold py-3 px-4 rounded-lg transition duration-300 transform active:scale-95 cursor-pointer"
    >
      {loading ? <ClipLoader color="#ffffff" size={20} /> : value}
    </button>
  );
}
