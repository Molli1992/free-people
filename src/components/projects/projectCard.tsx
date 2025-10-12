'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProjectCardProps } from '@/types/types';
import styles from './projectCard.module.css';
import { FaExternalLinkAlt, FaExpandArrowsAlt } from 'react-icons/fa';
import ImageLightbox from '@/components/projects/imageLightbox/imageLightbox';

export default function ProjectCard({
  id,
  images,
  title,
  type,
}: ProjectCardProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleRouteClick = () => {
    router.push(`/project/${id}`);
  };

  const handleExpandClick = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.card}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${images[0].src})` }}
      ></div>

      <div className={styles.overlay}>
        <div
          className={styles.container}
          style={{ alignItems: 'end', gap: '10px' }}
        >
          <FaExternalLinkAlt
            className={styles.icon}
            onClick={handleRouteClick}
          />

          <FaExpandArrowsAlt
            className={styles.icon}
            onClick={handleExpandClick}
          />
        </div>

        <div
          className={styles.container}
          style={{ justifyContent: 'end', gap: '5px' }}
        >
          <p className={styles.type}>{type}</p>
          <p className={styles.title}>{title}</p>
        </div>
      </div>

      {isOpen ? <ImageLightbox images={images} onClose={onClose} /> : null}
    </div>
  );
}
