import { MouseEventHandler, ReactElement } from 'react';

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

export type Service = {
  id: string;
  icon: ReactElement;
  name: string;
  img: string;
};

export type CardServicesProps = {
  icon: React.ReactElement;
  name: string;
  img: string;
};
