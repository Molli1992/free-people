'use client';

import Separator from '@/components/texts/separator';
import Title from '@/components/texts/title';
import Text from '@/components/texts/text';
import { servicesData } from '@/data/servicesData';
import CardServices from '@/components/services/serviceCard';
import Slider from '@/components/slider/slider';
import { SwiperSlide } from 'swiper/react';
import RedButton from '@/components/buttons/redButton';
import { useRouter } from 'next/navigation';
import { IoIosArrowDroprightCircle } from 'react-icons/io';
import { SwiperProps as SwiperPropsType } from 'swiper/react';

export default function HomeServices() {
  const router = useRouter();

  const sliderProps: SwiperPropsType = {
    pagination: {
      clickable: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    loop: false,
    speed: 500,
    slidesPerView: 1,
    slidesPerGroup: 1,
    breakpoints: {
      640: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      1024: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      1280: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
    },
  };

  return (
    <section className="flex items-center justify-center py-16 px-4 bg-secondary-white">
      <div className="flex flex-col gap-6 w-full max-w-7xl">
        <Separator value="¿Que Hacemos?" />

        <Title value="Los servicios que brindamos" color="secondary" />

        <Text
          value="Transformamos sus ideas y sueños en realidad. Ya sea que busque construir desde cero, renovar un espacio existente o 
                necesite asesoramiento experto, estamos aquí para guiarlo en cada paso del camino. Explore nuestros servicios y contáctenos para 
                comenzar a construir su próximo gran proyecto."
          color="secondary"
        />

        <div className="w-full">
          {servicesData && servicesData.length > 0 && (
            <Slider props={sliderProps}>
              {servicesData.map((service) => (
                <SwiperSlide key={service.id}>
                  <div className="w-full flex items-center justify-center pb-12 px-2">
                    <CardServices
                      icon={service.icon}
                      name={service.name}
                      image={service.image}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Slider>
          )}
        </div>

        <div>
          <RedButton
            value={
              <div className="flex items-center gap-2">
                <p>Nuestros Servicios</p>
                <IoIosArrowDroprightCircle className="w-6 h-6" />
              </div>
            }
            onClick={() => router.push('/services')}
            loading={false}
          />
        </div>
      </div>
    </section>
  );
}
