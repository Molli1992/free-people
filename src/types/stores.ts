import { Team } from '@/types/team';
import { User } from '@/types/users';

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
  updateUserInStore: (teamMember: User) => void;
}
