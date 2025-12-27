import { StaticImageData } from 'next/image';

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
