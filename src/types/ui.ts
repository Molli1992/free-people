import { MouseEventHandler, ReactNode, ChangeEvent } from 'react';
import { StaticImageData } from 'next/image';
import { SwiperProps as SwiperPropsType } from 'swiper/react';
import {
  ColumnDef,
  PaginationState,
  Row,
  RowSelectionState,
} from '@tanstack/react-table';
import { Team } from '@/types/team';
import { User } from '@/types/users';

export interface DataTableProps<TData extends { id: string | number }> {
  columns: ColumnDef<TData>[];
  data: TData[];
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: (
    updater: RowSelectionState | ((old: RowSelectionState) => RowSelectionState)
  ) => void;
  isLoading?: boolean;
  renderSubComponent?: (props: { row: Row<TData> }) => React.ReactElement;
  pageCount?: number;
  pagination?: PaginationState;
  onPaginationChange?: React.Dispatch<React.SetStateAction<PaginationState>>;
  maxItemsPerPage?: boolean;
}

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

export type InputsProps = {
  type: string;
  id: string;
  name: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label: string;
};

export type ButtonsProps = {
  value: string | ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
  className?: string;
};

export interface SliderProps {
  props: SwiperPropsType;
  children: ReactNode;
}

export interface StoreImageLightboxProps {
  isOpen: boolean;
  images: StaticImageData[];
  setIsOpen: (boolean: boolean) => void;
  setimages: (images: StaticImageData[]) => void;
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

export interface ModalTypes {
  showModal: boolean;
  setShowModal: (boolean: boolean) => void;
}

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}

export interface TeamFormProps {
  isOpen: boolean;
  onClose: () => void;
  isEditMode: boolean;
  teamMember?: Team;
}
