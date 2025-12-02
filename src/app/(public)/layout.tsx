import Header from '@/components/header';
import Footer from '@/components/footer';
import ImageLightbox from '@/components/projects/imageLightbox/imageLightbox';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <ImageLightbox />
      <Footer />
    </div>
  );
}
