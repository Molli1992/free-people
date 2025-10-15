import PrimaryHeroSection from '@/components/heroSection/primaryHeroSection';
import HomeAboutUs from '@/components/home/homeAboutUs';
import HomeServices from '@/components/home/homeServices';
import HomeProjects from '@/components/home/homeProjects';
import Reviews from '@/components/reviews/reviews';

export default function HomePage() {
  return (
    <main>
      <PrimaryHeroSection />
      <HomeAboutUs />
      <HomeServices />
      <HomeProjects />
      <Reviews />
    </main>
  );
}
