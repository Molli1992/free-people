'use client';

import { Swiper } from 'swiper/react';
import React from 'react';
import { SliderProps } from '@/types/types';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Slider({ props, children }: SliderProps) {
  return (
    <Swiper modules={[Autoplay, Pagination]} {...props}>
      {children}
    </Swiper>
  );
}
