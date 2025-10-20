'use client';

import { useState } from 'react';
import { ServiceProps } from '@/types/types';
import styles from './servicesCard.module.css';

export default function ServiceCard({
  icon,
  name,
  image,
  description,
}: ServiceProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  console.log(description);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`${styles.card} ${isFlipped ? styles.isFlipped : ''}`}
      onClick={handleClick}
    >
      <div className={styles.cardSideFront}>
        <div className={styles.content}>
          <div className={styles.icon}>{icon}</div>
          <h3 className={styles.name}>{name}</h3>
        </div>
        <div className={styles.imageWrapper}>
          <img
            src={image.src}
            alt={`Imagen del servicio ${name}`}
            className={styles.image}
          />
        </div>
      </div>

      <div className={styles.cardSideBack}>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}
