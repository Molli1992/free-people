import { MouseEventHandler, ReactElement, ReactNode } from 'react';
import { StaticImageData } from 'next/image';
import { projectTypes } from './constants';
import { SwiperProps as SwiperPropsType } from 'swiper/react';

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
  value: string | ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  loading: boolean;
};

export type ServiceProps = {
  id?: string;
  icon: ReactElement;
  name: string;
  image: StaticImageData;
  description: string;
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

export type ProjectPageProps = {
  params: Promise<{ id: string }>;
};
export interface SliderProps {
  props: SwiperPropsType;
  children: ReactNode;
}

export interface StoreImageLightboxProps {
  isOpen: boolean;
  images: StaticImageData[];
  setIsOpen: (boolean: boolean) => void;
  setimages: (images: StaticImageData[]) => void;
}

export type ReviewsProps = {
  id?: string;
  name: string;
  occupation: string;
  description: string;
};

export type CompaniesDataProps = {
  id?: string;
  image: StaticImageData;
  name: string;
};

export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password?: string;
  created_at: Date;
  isEmailConfirmed: boolean;
  verificationToken?: string | null;
}

export interface UserPayload {
  name?: string;
  lastName?: string;
  email?: string;
  password?: string;
  isEmailConfirmed?: boolean;
  verificationToken?: string | null;
}
