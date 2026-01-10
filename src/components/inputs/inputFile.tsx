import { InputFileProps } from '@/types/ui';
import { IoMdClose } from 'react-icons/io';

export default function InputFile({
  label,
  previews,
  maxFiles,
  handleFileChange,
  removeImage,
}: InputFileProps) {
  const currentCount = previews.length;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <span
          className={`text-xs ${currentCount === maxFiles ? 'text-red-500' : 'text-gray-500'}`}
        >
          {currentCount} / {maxFiles} imágenes
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {previews.map((src, index) => (
          <div key={index} className="relative group">
            <img
              src={src}
              className="h-20 w-20 object-cover rounded border border-gray-200"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-md hover:bg-red-600 transition-colors"
            >
              <IoMdClose />
            </button>
          </div>
        ))}
      </div>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        disabled={currentCount >= maxFiles}
        className={`block w-full text-sm text-gray-500 
          file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
          file:text-sm file:font-semibold file:bg-black file:text-white 
          hover:file:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed`}
      />
    </div>
  );
}
