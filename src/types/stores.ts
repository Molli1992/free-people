import { Team } from '@/types/team';
import { User } from '@/types/users';
import { Project } from '@/types/projects';
import { Service } from '@/types/services';
import { Review } from './reviews';
import { Company } from './companies';

export interface StoreImageLightboxProps {
  isOpen: boolean;
  images: string[];
  setIsOpen: (boolean: boolean) => void;
  setimages: (images: string[]) => void;
}

export interface SidebarStoreProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (boolean: boolean) => void;
}

export interface TeamStoreProps {
  team: Team[];
  isDataLoad: boolean;
  setTeam: (data: Team[]) => void;
  addTeamMemberToStore: (teamMember: Team) => void;
  updateTeamMemberInStore: (teamMember: Team) => void;
  removeTeamMemberFromStore: (id: number) => void;
}

export interface UsersStoreProps {
  users: User[];
  isDataLoad: boolean;
  setUsers: (data: User[]) => void;
  updateUserInStore: (user: User) => void;
  removeUserFromStore: (id: number) => void;
}

export interface ProjectsStoreProps {
  projects: Project[];
  isDataLoad: boolean;
  setProjects: (data: Project[]) => void;
  addProjectsToStore: (project: Project) => void;
  updateProjectsInStore: (updatedProject: Project) => void;
  removeProjectsFromStore: (id: number) => void;
}

export interface ServicesStoreProps {
  services: Service[];
  isDataLoad: boolean;
  setServices: (data: Service[]) => void;
  addServiceToStore: (service: Service) => void;
  updateServiceInStore: (updatedService: Service) => void;
  removeServiceFromStore: (id: number) => void;
}

export interface ReviewStoreProps {
  reviews: Review[];
  isDataLoad: boolean;
  setReviews: (data: Review[]) => void;
  addReviewToStore: (review: Review) => void;
  updateReviewInStore: (review: Review) => void;
  removeReviewFromStore: (id: number) => void;
}

export interface CompaniesStoreProps {
  companies: Company[];
  isDataLoad: boolean;
  setCompanies: (data: Company[]) => void;
  addCompaniesToStore: (company: Company) => void;
  updateCompaniesInStore: (updatedCompany: Company) => void;
  removeCompaniesFromStore: (id: number) => void;
}
