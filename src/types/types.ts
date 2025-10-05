import { MouseEventHandler } from 'react';

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
