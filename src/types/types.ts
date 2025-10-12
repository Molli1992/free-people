import { MouseEventHandler, ReactElement } from 'react';
import { StaticImageData } from 'next/image';
import { projectTypes } from './constants';

export type SecondaryHeroSectionProps = {
  route: string;
};

export type SeparatorProps = {
  value: string;
};

export type TextsProps = {
  value: string;
  color: 'primary' | 'secondary';
};

export type ButtonsProps = {
  value: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  loading: boolean;
};

export type ServiceProps = {
  id?: string;
  icon: ReactElement;
  name: string;
  image: StaticImageData;
};

export type TeamProps = {
  id?: string;
  image: StaticImageData;
  name: string;
  profession: string;
  linkedin: string;
  instagram: string;
  facebook: string;
};

export type ProjectType = (typeof projectTypes)[number];

export type ProjectsProps = {
  id: string;
  images: StaticImageData[];
  title: string;
  type: ProjectType[];
  description: string[];
};

export type ProjectCardProps = {
  id: string;
  images: StaticImageData[];
  title: string;
  type: ProjectType[];
};

export type ProjectDescriptionProps = {
  images: StaticImageData[];
  description: string[];
};

export type ImageLightboxProps = {
  images: StaticImageData[];
  onClose: () => void;
};

export type ProjectPageProps = {
  params: { id: string };
};
