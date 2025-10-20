import { ServiceProps } from '@/types/types';
import styles from './servicesCard.module.css';

export default function ServiceCard({
  icon,
  name,
  image,
  description,
}: ServiceProps) {
  return (
    <div className={styles.card}>
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
