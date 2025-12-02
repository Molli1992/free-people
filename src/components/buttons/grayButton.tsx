import { ClipLoader } from 'react-spinners';
import { ButtonsProps } from '@/types/types';

export default function GrayButton({
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
      className="w-full flex items-center justify-center px-4 py-2 text-gray-700 hover:text-gray-800 bg-gray-200 hover:bg-gray-300 rounded-lg transition cursor-pointer"
    >
      {loading ? <ClipLoader color="#ffffff" size={20} /> : value}
    </button>
  );
}
