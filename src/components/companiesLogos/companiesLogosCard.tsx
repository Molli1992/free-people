import { CompanyCardProps } from '@/types/companies';

export default function CompaniesLogosCard({ image, name }: CompanyCardProps) {
  return (
    <div className="w-full max-w-sm h-[150px] bg-white p-4">
      <img src={image} alt={name} className="w-full h-full" />
    </div>
  );
}
