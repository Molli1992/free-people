import { ReactElement } from 'react';
import { StaticImageData } from 'next/image';

export type ServiceProps = {
  id?: string;
  icon: ReactElement;
  name: string;
  image: StaticImageData;
  description: string;
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
