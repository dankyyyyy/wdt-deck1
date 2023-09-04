import { defineStore } from "pinia";
import { ITeam } from '@/types/index'
import axios from "axios"

export const useTeamStore = defineStore("TeamStore", {
  state: () => ({
    team: [] as ITeam[]
  }),
  actions: {
    async getAll() {
      try {
        let data = await $fetch<ITeam[]>("/api/teams")
        this.team = data; // Update the store's team with the processed teams
        
        return data;
      } catch (e) {
        console.error(e)
      }
    },
    async post(team: ITeam) {
      try {
        console.log('Registering team to database')
        const response = await axios.post('/api/teams/create', team);
        console.log(response.data.message);
        // handle success
      } catch (error) {
        console.error(error);
        // handle error
      }
      this.getAll()
    },

    async put(team: ITeam){
      try {
        console.log('Updating team ', team.name, ' ', team._id);
        const response = await axios.put('/api/teams/update', team);
        console.log(response.data.message);
        // handle success
      } catch (error) {
        console.error(error);
        // handle error
      }
      this.getAll()
    },

    async delete(team: ITeam){
      try {
        console.log('Deleting team ', team.name, ' ', team._id);
        const response = await axios.delete(`/api/teams/delete/${team._id}`);
        console.log(response.data.message);
        //handle success
      } catch (error) {
        console.error(error);
        // handle error
      }
      this.getAll()
    }
  }
});
