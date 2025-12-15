export type Team = {
  id: number;
  name: string;
  profession: string;
  image: string;
  linkedin: string;
  instagram: string;
  facebook: string;
};

export type TeamPayload = {
  name: string;
  profession: string;
  image: string;
  linkedin: string;
  instagram: string;
  facebook: string;
};

export interface UseTeamReturn {
  loading: boolean;
  error: string | null;
  getTeam: () => Promise<Team[]>;
  createTeamMember: (data: TeamPayload) => Promise<Team | undefined>;
  updateTeamMember: (
    id: number,
    data: TeamPayload
  ) => Promise<Team | undefined>;
  deleteTeamMember: (id: number) => Promise<Team | undefined>;
}

export type TeamCardProps = {
  name: string;
  profession: string;
  image: string;
  linkedin: string;
  instagram: string;
  facebook: string;
};

export interface TeamFormProps {
  isOpen: boolean;
  onClose: () => void;
  isEditMode: boolean;
  teamMember?: Team;
}
