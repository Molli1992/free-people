import { create } from 'zustand';
import { TeamStoreProps } from '@/types/stores';

export const useTeamStore = create<TeamStoreProps>((set, get) => ({
  team: [],
  isDataLoad: false,

  setTeam: (data) =>
    set({
      team: data,
      isDataLoad: true,
    }),

  addTeamMemberToStore: (teamMember) => {
    const { team } = get();
    const teamSinDuplicado = team.filter((tm) => tm.id !== teamMember.id);

    set({ team: [...teamSinDuplicado, teamMember] });
  },

  updateTeamMemberInStore: (updatedTeamMember) => {
    const { team } = get();
    const newData = team.map((member) => {
      return member.id === updatedTeamMember.id ? updatedTeamMember : member;
    });

    set({ team: newData });
  },

  removeTeamMemberFromStore: (id) => {
    const { team } = get();
    const newData = team.filter((teamMember) => {
      return teamMember.id !== id;
    });

    set({ team: newData });
  },
}));
