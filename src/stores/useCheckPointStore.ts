import { defineStore } from 'pinia';
import api from '../boot/axios';
import CheckPointModel from 'src/models/CheckPoint';
export const useCheckPointStore = defineStore('CheckPoint', {
  state: () => ({
    checkPoint: {
      _id: '',
      user: '',
      moment: '',
      scheduled: '',
      present: false,
      info: '',
      classe: '',
    },
    checkPoints: [],
  }),
  getters: {},
  actions: {
    async createCheckPoint(dados: any) {
      console.log(dados);
      try {
        const response = await api.postData(
          '/checkpoint',
          dados,
          this.montaHeaders()
        );
        this.checkPoint = response.data;
      } catch (e) {
        return e;
      }
    },

    async updateCheckPoint(dados: any) {
      if (
        dados.user &&
        dados.classe &&
        dados._id &&
        dados.scheduled &&
        dados.present
      ) {
        try {
          const response = await api.putData(
            '/checkpoint',
            dados,
            this.montaHeaders()
          );
          this.checkPoint = response.data;
        } catch (e) {
          return e;
        }
      } else {
        throw new Error('preencha todas as informações');
      }
    },

    montaHeaders() {
      const token: string = window.localStorage.getItem('token') || '';
      return {
        headers: {
          Authorization: `Basic ${token}`,
        },
      };
    },

    async getCheckPoint(classe: string, user?: string) {
      try {
        if (classe.length < 2) {
          return { e: 'deu ruin' };
        }
        let url = 'checkpoint?classe=' + classe;
        if (user) {
          url += '&user=' + user;
        }
        const response = await api.getData(url, this.montaHeaders());
        this.checkPoints = response.data;
      } catch (e) {
        return e;
      }
    },

    async getAll() {
      try {
        const response = await api.getData(
          'checkpoint/getall',
          this.montaHeaders()
        );
        this.checkPoints = response.data;
      } catch (e) {
        return e;
      }
    },
    async deleteCheckpoint(_id: string) {
      try {
        if (_id.length < 2) {
          return { e: 'deu ruin' };
        }
        const response = await api.deleteData(
          'checkpoint/?id=' + _id,
          this.montaHeaders()
        );
        console.log(response.data);
      } catch (e) {
        return e;
      }
    },
  },
});
