'use client';

import CardReview from '@/components/reviews/cardReview';
import Separator from '@/components/texts/separator';
import Title from '@/components/texts/title';
import Text from '@/components/texts/text';
import { reviewsData } from '@/data/reviewsData';
import Slider from '@/components/slider';
import { SwiperSlide } from 'swiper/react';
import { SwiperProps as SwiperPropsType } from 'swiper/react';

export default function Reviews() {
  const sliderProps: SwiperPropsType = {
    pagination: {
      clickable: true,
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
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
    },
  };

  return (
    <section className="flex items-center justify-center py-16 px-4 bg-skyBlue">
      <div className="flex flex-col xl:flex-row gap-12 w-full max-w-5xl xl:max-w-7xl">
        <div className="flex flex-col w-full xl:w-1/2 gap-4">
          <Separator value="Testimonios" />
          <Title value="Los mensajes de nuestros clientes" color="secondary" />
          <Text
            value="Su satisfacción es nuestra mejor carta de presentación. Lea lo que dicen quienes confiaron en nuestra calidad, 
            compromiso y dedicación para hacer realidad sus proyectos."
            color="secondary"
          />
        </div>

        <div className="flex w-full xl:w-1/2">
          {reviewsData && reviewsData.length > 0 && (
            <Slider props={sliderProps}>
              {reviewsData.map((review) => (
                <SwiperSlide key={review.id}>
                  <div className="w-full flex items-center justify-center pb-12 px-2">
                    <CardReview
                      key={review.id}
                      name={review.name}
                      occupation={review.occupation}
                      description={review.description}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
}
