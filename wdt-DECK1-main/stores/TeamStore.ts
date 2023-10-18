import { defineStore } from "pinia";
import { ITeam } from '@/types/index'
import axios from "axios"

export const useTeamStore = defineStore("TeamStore", {
  state: () => ({
    teams: [] as ITeam[],
    selectedTeam: null as unknown as ITeam,
  }),
  actions: {
    async getByName(name: string) {
      try {
        let data = await $fetch<ITeam[]>("/api/teams")
        const filteredData = data.filter(team => team.name === name);
        data = filteredData;
        if (data.length === 1) {
          const team = data[0];
          return team as ITeam
        }
      } catch (e) {
        console.error(e)
      }
    },

    async getAll() {
      try {
        let data = await $fetch<ITeam[]>("/api/teams")
        this.teams = data;
        return data;
      } catch (e) {
        console.error(e)
      }
    },

    async post(team: ITeam) {
      try {
        console.log('Creating team ', team.name, ' ', team._id);
        const response = await axios.post('/api/teams/create', team);
        console.log(response.data.message);
        if (response.status === 200) {
          console.log('Team created successfully\n', response);
        } else {
          console.error('Team creation failed with status', response.status);
        }
      } catch (error) {
        console.error('Error creating team: ', error);
      }
      this.getAll()
    },

    async put(team: ITeam) {
      try {
        console.log('Updating team ', team.name, ' ', team._id);
        const response = await axios.put('/api/teams/update', team);
        console.log(response.data.message);
        if (response.status === 200) {
          console.log('Team updated successfully\n', response);
        } else {
          console.error('Team update failed with status', response.status);
        }
      } catch (error) {
        console.error('Error updating team: ', error);
      }
      this.getAll()
    },

    async delete(team: ITeam) {
      try {
        console.log('Deleting team ', team.name, ' ', team._id);
        const response = await axios.delete('/api/teams/delete', {
          data: team
        });
        console.log(response.data.message);
        if (response.status === 200) {
          console.log('Team deleted successfully\n', response);
        } else {
          console.error('Team deletion failed with status', response.status);
        }
      } catch (error) {
        console.error('Error deleting team: ', error);
      }
      this.getAll()
    },
    setSelectedTeam(team: ITeam) {
      this.selectedTeam = team;
    },
    getSelectedTeam(): unknown | ITeam {
      return this.selectedTeam;
    },
  }
});
