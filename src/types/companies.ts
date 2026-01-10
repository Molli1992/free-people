export type Company = {
  id: number;
  image: string;
  name: string;
};

export type CompanyPayload = {
  image: string | File;
  name: string;
};

export type CompanyCardProps = {
  image: string;
  name: string;
};

export interface UseCompanyReturn {
  loading: boolean;
  error: string | null;
  getCompanies: () => Promise<Company[]>;
  createCompany: (data: CompanyPayload) => Promise<Company | null>;
  updateCompany: (id: number, data: CompanyPayload) => Promise<Company | null>;
  deleteCompany: (id: number) => Promise<Company | null>;
}

export interface CompanyFormProps {
  isOpen: boolean;
  onClose: () => void;
  isEditMode: boolean;
  company?: Company;
}

export interface CompanyCreateInput {
  name: string;
  image: File[];
}

export interface CompanyUpdateInput {
  name: string;
  newFiles: File[];
  existingImages: string[];
}
