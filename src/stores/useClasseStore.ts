import { defineStore } from 'pinia';
import api from '../boot/axios';
import ClasseModel from '../models/Classe';
import Grid from 'src/models/Grid';
export const useClasseStore = defineStore('Classe', {
  state: () => ({
    classe: {
      _id: '',
      classeName: '',
      description: '',
      curso: [],
      price: '',
      grid: Array<Grid>,
      students: [],
    },
    grid: {
      dateScheduled: '',
      info: '',
      classHeld: false,
    },
    classes: Array<ClasseModel>,
  }),
  getters: {},
  actions: {
    async createClasses(dados: any) {
      console.log(dados);
      try {
        const response = await api.postData(
          '/classe',
          dados,
          this.montaHeaders()
        );
        this.classe = response.data;
      } catch (e) {
        return e;
      }
    },

    async updateClasse(dados: any) {
      if (dados.price && dados.classeName && dados._id) {
        try {
          console.log(dados, 111111111);
          const response = await api.putData(
            '/classe',
            dados,
            this.montaHeaders()
          );
          this.classe = response.data;
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

    async getClasseId(_id: string) {
      try {
        if (_id.length < 2) {
          return { e: 'deu ruin' };
        }
        const response = await api.getData(
          'classe/?id=' + _id,
          this.montaHeaders()
        );
        this.classe = response.data;
      } catch (e) {
        return e;
      }
    },

    async getAll() {
      try {
        const response = await api.getData(
          'classe/getall',
          this.montaHeaders()
        );
        this.classes = response.data;
      } catch (e) {
        return e;
      }
    },
    async deleteClasse(_id: string) {
      try {
        if (_id.length < 2) {
          return { e: 'deu ruin' };
        }
        const response = await api.deleteData(
          'classe/?id=' + _id,
          this.montaHeaders()
        );
        this.classe = response.data;
      } catch (e) {
        return e;
      }
    },
  },
});
