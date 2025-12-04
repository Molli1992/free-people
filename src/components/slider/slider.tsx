'use client';

import { Swiper } from 'swiper/react';
import { SliderProps } from '@/types/ui';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import dynamic from 'next/dynamic';
import { ClipLoader } from 'react-spinners';
import './slider.css';

function SwiperBase({ props, children }: SliderProps) {
  return (
    <Swiper modules={[Autoplay, Pagination]} {...props}>
      {children}
    </Swiper>
  );
}

const SliderLoader = () => (
  <div className="flex items-center justify-center w-full h-96">
    <ClipLoader
      color="#fd4a36"
      loading={true}
      size={75}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </div>
);

const DynamicSlider = dynamic(() => Promise.resolve(SwiperBase), {
  ssr: false,
  loading: SliderLoader,
});

export default DynamicSlider;
