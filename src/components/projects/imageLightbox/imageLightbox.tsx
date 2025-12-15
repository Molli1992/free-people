'use client';

import { useEffect } from 'react';
import styles from './imageLightbox.module.css';
import { FaTimes } from 'react-icons/fa';
import { useImageLightboxStore } from '@/zustand/imageLightboxStore';
import Slider from '@/components/slider/slider';
import { SwiperSlide } from 'swiper/react';
import { SwiperProps as SwiperPropsType } from 'swiper/react';

export default function ImageLightbox() {
  const { isOpen, images, setIsOpen } = useImageLightboxStore();

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
  };

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!isOpen || images.length === 0) {
    return null;
  } else if (isOpen && images.length !== 0) {
    return (
      <div className={styles.backdrop}>
        <div className={styles.container}>
          <button className={styles.closeButton} onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className={styles.content}>
          <div className="w-full">
            {images && images.length > 0 && (
              <Slider props={sliderProps}>
                {images.map((image) => (
                  <SwiperSlide key={image}>
                    <div className={styles.imgContainer}>
                      <img
                        src={image}
                        alt={`Project image`}
                        className={styles.img}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    );
  }
}
