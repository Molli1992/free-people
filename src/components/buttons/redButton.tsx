import { ClipLoader } from 'react-spinners';
import { ButtonsProps } from '@/types/types';

export default function RedButton({ value, onClick, loading }: ButtonsProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center font-semibold bg-orange text-lg text-white px-4 py-2 rounded-md hover:bg-secondary-darkBlue w-fit cursor-pointer"
    >
      {loading ? <ClipLoader color="#ffffff" size={25} /> : value}
    </button>
  );
}
