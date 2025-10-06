import SecondaryHeroSection from '@/components/heroSection/secondaryHeroSection';
import AboutCompany from '@/components/aboutUs/aboutCompany';
import WhyChooseUs from '@/components/aboutUs/whyChooseUs';

export default function AboutUsPage() {
  return (
    <main>
      <SecondaryHeroSection route="Nosotros" />
      <AboutCompany />
      <WhyChooseUs />
    </main>
  );
}
