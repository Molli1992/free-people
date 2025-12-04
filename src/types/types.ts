import { ReactElement } from 'react';
import { StaticImageData } from 'next/image';
import { projectTypes } from './constants';

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
