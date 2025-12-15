'use client';

import { useRef } from 'react';
import { FaLinkedinIn, FaInstagram, FaFacebook } from 'react-icons/fa';
import { TeamCardProps } from '@/types/team';
import styles from './teamCard.module.css';

export default function TeamCard({
  image,
  name,
  profession,
  linkedin,
  instagram,
  facebook,
}: TeamCardProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleSocialClick = (url: string) => {
    if (overlayRef.current) {
      const overlayStyles = window.getComputedStyle(overlayRef.current);

      if (overlayStyles.opacity === '1') {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    }
  };

  return (
    <div className={styles.card}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      <div className={styles.overlay} ref={overlayRef}>
        <button
          onClick={() => handleSocialClick(linkedin)}
          className={styles.socialLink}
        >
          <FaLinkedinIn />
        </button>

        <button
          onClick={() => handleSocialClick(instagram)}
          className={styles.socialLink}
        >
          <FaInstagram />
        </button>

        <button
          onClick={() => handleSocialClick(facebook)}
          className={styles.socialLink}
        >
          <FaFacebook />
        </button>
      </div>

      <div className={styles.infoBox}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.profession}>{profession}</p>
      </div>
    </div>
  );
}
