'use client';

import { useEffect } from 'react';
import Slider from '@/components/slider/slider';
import { SwiperSlide } from 'swiper/react';
import CompaniesLogosCard from '@/components/companiesLogos/companiesLogosCard';
import { SwiperProps as SwiperPropsType } from 'swiper/react';
import { useCompanies } from '@/lib/hooks/companiesHook';
import { useCompaniesStore } from '@/zustand/companiesStore';
import { ClipLoader } from 'react-spinners';

export default function CompaniesLogos() {
  const { getCompanies } = useCompanies();
  const { companies, setCompanies, isDataLoad } = useCompaniesStore();

  useEffect(() => {
    const fetchCompanies = async () => {
      if (isDataLoad) return;

      const fullCompanies = await getCompanies();
      if (!fullCompanies) return;
      setCompanies(fullCompanies);
    };

    fetchCompanies();
  }, [getCompanies, isDataLoad]);

  if (!isDataLoad)
    return (
      <div className="h-[300px] w-full flex items-center justify-center bg-darkBlue">
        <ClipLoader color="#000000" size={50} />
      </div>
    );

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
        {companies && companies.length > 0 && (
          <Slider props={sliderProps}>
            {companies.map((company) => (
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
