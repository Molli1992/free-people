import PrimaryHeroSection from '@/components/heroSection/primaryHeroSection';
import HomeAboutUs from '@/components/home/homeAboutUs';
import HomeServices from '@/components/home/homeServices';
import HomeProjects from '@/components/home/homeProjects';
import Reviews from '@/components/reviews/reviews';
import CompaniesLogos from '@/components/companiesLogos/companiesLogos';
import ContactForm from '@/components/contact/contactForm';

export default function HomePage() {
  return (
    <main>
      <PrimaryHeroSection />
      <HomeAboutUs />
      <HomeServices />
      <HomeProjects />
      <Reviews />
      <CompaniesLogos />
      <ContactForm />
    </main>
  );
}
