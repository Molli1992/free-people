import { CardServicesProps } from '@/types/types';

export default function CardServices({ icon, name, img }: CardServicesProps) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-xl shadow-md transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      <div className="p-8 flex flex-col gap-4">
        <div className="text-orange text-6xl">{icon}</div>

        <h3 className="text-2xl font-bold text-midnightBlue min-h-[64px] flex items-center">
          {name}
        </h3>
      </div>

      <div className="p-4 w-full h-56">
        <img
          src={img}
          alt={`Imagen del servicio ${name}`}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
