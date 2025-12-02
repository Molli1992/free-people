import { ClipLoader } from 'react-spinners';
import { InputsProps } from '@/types/types';

export default function PrimaryInput({
  type,
  id,
  name,
  placeholder,
  onChange,
  value,
  label,
}: InputsProps) {
  return (
    <div>
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-200 outline-none transition duration-200"
      />
    </div>
  );
}
