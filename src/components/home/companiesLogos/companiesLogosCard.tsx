import { CompaniesDataProps } from '@/types/types';

export default function CompaniesLogosCard({
  image,
  name,
}: CompaniesDataProps) {
  return (
    <div className="w-[300px] h-[150px] bg-white p-4">
      <img src={image.src} alt={name} className="w-full h-full" />
    </div>
  );
}
