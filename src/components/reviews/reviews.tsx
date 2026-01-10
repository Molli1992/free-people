'use client';

import { useEffect } from 'react';
import CardReview from '@/components/reviews/cardReview';
import Separator from '@/components/texts/separator';
import Title from '@/components/texts/title';
import Text from '@/components/texts/text';
import Slider from '@/components/slider/slider';
import { SwiperSlide } from 'swiper/react';
import { SwiperProps as SwiperPropsType } from 'swiper/react';
import { useReviews } from '@/lib/hooks/reviewsHook';
import { useReviewsStore } from '@/zustand/reviewsStore';
import { ClipLoader } from 'react-spinners';

export default function Reviews() {
  const { getReviews } = useReviews();
  const { reviews, setReviews, isDataLoad } = useReviewsStore();
  const totalReviews = reviews.length;

  useEffect(() => {
    const fetchReviews = async () => {
      if (isDataLoad) return;

      const fullReviews = await getReviews();
      if (!fullReviews) return;
      setReviews(fullReviews);
    };

    fetchReviews();
  }, [getReviews, isDataLoad]);

  if (!isDataLoad)
    return (
      <div className="h-[300px] w-full flex items-center justify-center bg-skyBlue">
        <ClipLoader color="#000000" size={50} />
      </div>
    );

  if (reviews.length === 0) return null;

  const sliderProps: SwiperPropsType = {
    pagination: {
      clickable: true,
    },
    loop: false,
    speed: 500,
    slidesPerView: 1,
    slidesPerGroup: 1,
    breakpoints: {
      768: { slidesPerView: totalReviews >= 2 ? 2 : 1 },
      1024: { slidesPerView: totalReviews >= 3 ? 3 : totalReviews },
      1280: { slidesPerView: totalReviews >= 2 ? 2 : 1 },
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
          {reviews && reviews.length > 0 && (
            <Slider props={sliderProps}>
              {reviews.map((review) => (
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
