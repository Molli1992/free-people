import { InputsProps } from '@/types/ui';

export default function PrimaryTextArea({
  id,
  name,
  placeholder,
  onChange,
  value,
  label,
  maxLength,
}: InputsProps) {
  return (
    <div>
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        maxLength={maxLength}
        className="w-full h-[120px] px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-200 outline-none transition duration-200"
      />
      {maxLength && (
        <p className="text-xs text-gray-400">
          {value.length} / {maxLength}
        </p>
      )}
    </div>
  );
}
