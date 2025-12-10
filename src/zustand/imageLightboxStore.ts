import { create } from 'zustand';
import { StoreImageLightboxProps } from '@/types/ui';

export const useImageLightboxStore = create<StoreImageLightboxProps>((set) => ({
  isOpen: false,
  images: [],

  setIsOpen: (boolean) =>
    set({
      isOpen: boolean,
    }),

  setimages: (images) =>
    set({
      images: images,
    }),
}));
