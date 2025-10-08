import { FaLinkedinIn, FaInstagram, FaFacebook } from 'react-icons/fa';
import { TeamCardProps } from '@/types/types';
import styles from './teamCard.module.css';

export default function TeamCard({
  image,
  name,
  profession,
  linkedin,
  instagram,
  facebook,
}: TeamCardProps) {
  return (
    <div className={styles.card}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      <div className={styles.overlay}>
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
        >
          <FaLinkedinIn />
        </a>

        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
        >
          <FaInstagram />
        </a>

        <a
          href={facebook}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
        >
          <FaFacebook />
        </a>
      </div>

      <div className={styles.infoBox}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.profession}>{profession}</p>
      </div>
    </div>
  );
}
