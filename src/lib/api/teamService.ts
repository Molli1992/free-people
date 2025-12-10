import { Team, TeamPayload } from '@/types/team';
import axios from 'axios';

export const teamService = {
  /**
   * Gets the list of team members.
   * @returns Promise<Team[]>
   */
  getTeam: async (): Promise<Team[]> => {
    const response = await axios.get('/api/team');
    return response.data;
  },

  /**
   * Create a team member.
   * @param data Data to create new team member
   * @returns Promise<Team>
   */
  createTeamMember: async (data: TeamPayload): Promise<Team> => {
    const response = await axios.post(`/api/team`, data);
    return response.data.data;
  },

  /**
   * Update a team member.
   * @param id Team member ID
   * @param data Data to update
   * @returns Promise<Team>
   */
  updateTeamMember: async (id: number, data: TeamPayload): Promise<Team> => {
    const response = await axios.put(`/api/team/${id}`, data);
    return response.data.data;
  },

  /**
   * Remove a team member.
   * @param id Team member ID
   * @returns Promise<Team>
   */
  deleteTeamMember: async (id: number): Promise<Team> => {
    const response = await axios.delete(`/api/team/${id}`);
    return response.data;
  },
};
