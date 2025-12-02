import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Free People Arquitectura',
  description:
    'Soluciones personalizadas, innovadoras y eficientes. ¡Contáctanos!',
  keywords: [
    'estudio de arquitectura',
    'arquitectos argentina',
    'arquitectura capital federal',
    'arquitecto buenos aires',
    'estudio de diseño y construcción',
    'diseño de casas',
    'proyectos residenciales',
    'dirección de obra',
    'reformas integrales',
    'construcción de vivienda',
    'diseño de interiores',
    'desarrollo de proyectos',
    'arquitecto CABA',
    'arquitectura Palermo',
    'proyectos de arquitectura en Argentina',
    'arquitectura moderna',
    'diseño sostenible',
    'arquitectura de lujo',
  ],
  authors: [
    {
      name: 'Free People Arquitectura',
      url: 'https://freepeoplearq.netlify.app/',
    },
  ],
  creator: 'Free People Arquitectura',
  metadataBase: new URL('https://freepeoplearq.netlify.app/'),
  openGraph: {
    title: 'Free People Arquitectura',
    description:
      'Soluciones personalizadas, innovadoras y eficientes. ¡Contáctanos!',
    url: 'https://freepeoplearq.netlify.app/',
    siteName: 'Free People',
    images: [
      {
        url: '',
        width: 1200,
        height: 630,
        alt: 'Logo',
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free People Arquitectura',
    description:
      'Soluciones personalizadas, innovadoras y eficientes. ¡Contáctanos!',
    images: [''],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
