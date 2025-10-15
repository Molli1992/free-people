'use client';

import { useState, useEffect } from 'react';
import styles from './imageLightbox.module.css';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useImageLightboxStore } from '@/zustand/imageLightboxStore';

export default function ImageLightbox() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isOpen, images, setIsOpen } = useImageLightboxStore();

  const onClose = () => {
    setIsOpen(false);
  };

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
  }, []);

  if (!isOpen || images.length === 0) {
    return null;
  } else if (isOpen && images.length !== 0) {
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
}
