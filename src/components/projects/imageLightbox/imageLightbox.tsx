'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './ImageLightbox.module.css';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { ImageLightboxProps } from '@/types/types';

export default function ImageLightbox({ images, onClose }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
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
  }, [onClose]);

  return (
    <div className={styles.backdrop}>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <p>{currentIndex + 1}</p>
          <p>/</p>
          <p>{images.length}</p>
        </div>

        <button className={styles.closeButton} onClick={onClose}>
          <FaTimes />
        </button>
      </div>

      <div className={styles.content}>
        <button
          className={`${styles.button} ${styles.desktop}`}
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
        >
          <FaChevronLeft />
        </button>

        <img
          src={images[currentIndex].src}
          alt={`Project image ${currentIndex + 1}`}
          className={styles.img}
        />

        <button
          className={`${styles.button} ${styles.desktop}`}
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
        >
          <FaChevronRight />
        </button>

        <div className={styles.movile}>
          <button
            className={styles.button}
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
          >
            <FaChevronLeft />
          </button>

          <button
            className={styles.button}
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
