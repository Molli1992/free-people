import { ReactNode } from 'react';

export type Service = {
  id: number;
  name: string;
  image: string;
  description: string;
};

export type ServicePayload = {
  name: string;
  image: string | File;
  description: string;
};

export interface ServiceCardProps {
  name: string;
  image: string;
  description: string;
  icon?: ReactNode;
}

export interface UseServiceReturn {
  loading: boolean;
  error: string | null;
  getServices: () => Promise<Service[] | null>;
  createService: (data: ServicePayload) => Promise<Service | null>;
  updateService: (id: number, data: ServicePayload) => Promise<Service | null>;
  deleteService: (id: number) => Promise<Service | null>;
}

export interface ServicesFormProps {
  isOpen: boolean;
  onClose: () => void;
  isEditMode: boolean;
  service?: Service | null;
}

export interface ServiceCreateInput {
  name: string;
  description: string;
  image: File[];
}

export interface ServiceUpdateInput {
  name: string;
  description: string;
  newFiles: File[];
  existingImages: string[];
}
