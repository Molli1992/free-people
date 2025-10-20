'use client';

import { companiesData } from '@/data/companiesLogoData';
import Slider from '@/components/slider/slider';
import { SwiperSlide } from 'swiper/react';
import CompaniesLogosCard from '@/components/companiesLogos/companiesLogosCard';
import { SwiperProps as SwiperPropsType } from 'swiper/react';

export default function CompaniesLogos() {
  const sliderProps: SwiperPropsType = {
    pagination: {
      clickable: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
    },
    loop: false,
    speed: 500,
    slidesPerView: 1,
    slidesPerGroup: 1,
    breakpoints: {
      768: {
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
    <section className="flex items-center justify-center py-16 px-4 bg-darkBlue">
      <div className="w-full max-w-7xl">
        {companiesData && companiesData.length > 0 && (
          <Slider props={sliderProps}>
            {companiesData.map((company) => (
              <SwiperSlide key={company.id}>
                <div className="w-full flex items-center justify-center pb-12 px-2">
                  <CompaniesLogosCard
                    image={company.image}
                    name={company.name}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
}
