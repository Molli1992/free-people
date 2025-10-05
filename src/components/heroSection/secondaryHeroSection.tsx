import Link from 'next/link';
import { SecondaryHeroSectionProps } from '@/types/types';

export default function SecondaryHeroSection({
  route,
}: SecondaryHeroSectionProps) {
  return (
    <section
      className="relative flex flex-col text-white gap-4 items-center justify-center w-full h-[65vh] 
                 bg-cover bg-center 
                 bg-[url('/primary-hero-section-bg-img.jpg')]"
    >
      <h1 className="text-6xl font-bold">{route}</h1>

      <div className="flex gap-2 items-center">
        <Link href="/" className="hover:text-secondary-darkBlue">
          Home
        </Link>
        <p>/</p>
        <p>{route}</p>
      </div>

      <div className="hidden lg:flex absolute bottom-0 right-0 h-[60%]">
        <img src="/primary-hero-section-bg-img-3.png" alt="Casa" />
      </div>
    </section>
  );
}
