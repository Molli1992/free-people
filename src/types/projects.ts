export type Project = {
  id: number;
  images: string[];
  title: string;
  type: string;
  description: string;
  challenge: string;
  finalView: string;
};

export type ProjectPayload = {
  images: string[];
  title: string;
  type: string;
  description: string;
  challenge: string;
  finalView: string;
};

export type ProjectCardProps = {
  id: number;
  images: string[];
  title: string;
  type: string;
};

export type ProjectDescriptionProps = {
  images: string[];
  description: string;
  challenge: string;
  finalView: string;
};

export type ProjectPageProps = {
  params: Promise<{ id: string }>;
};

export interface UseProjectsReturn {
  loading: boolean;
  error: string | null;
  getAllProjects: () => Promise<Project[] | null>;
  createProject: (data: ProjectPayload) => Promise<Project | null>;
  updateProject: (id: number, data: ProjectPayload) => Promise<Project | null>;
  deleteProject: (id: number) => Promise<Project | null>;
}

export interface ProjectsFormProps {
  isOpen: boolean;
  onClose: () => void;
  isEditMode: boolean;
  project?: Project | null;
}
