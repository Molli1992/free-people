export type Projects = {
  id: number;
  images: string[];
  title: string;
  type: string[];
  description: string[];
};

export type ProjectCardProps = {
  id: number;
  images: string[];
  title: string;
  type: string[];
};

export type ProjectDescriptionProps = {
  images: string[];
  description: string[];
};

export type ProjectPageProps = {
  params: Promise<{ id: string }>;
};
