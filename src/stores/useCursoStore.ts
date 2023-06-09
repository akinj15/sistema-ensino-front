import { defineStore } from 'pinia';
import api from '../boot/axios';
import CursoModel from '../models/Curso';
export const useCursoStore = defineStore('Curso', {
  state: () => ({
    curso: {
      _id: '',
      title: '',
      description: '',
      bio: '',
      price: '',
      grid: [],
    },
    grid: {
      dateScheduled: '',
      info: '',
      classHeld: false,
    },
    cursos: Array<CursoModel>,
  }),
  getters: {},
  actions: {
    async createCurso(dados: any) {
      console.log(dados);
      try {
        const response = await api.postData(
          '/curso',
          dados,
          this.montaHeaders()
        );
        this.curso = response.data;
      } catch (e) {
        return e;
      }
    },

    async updateCurso(dados: any) {
      if (dados.price && dados.title && dados._id) {
        try {
          console.log(dados, 111111111);
          const response = await api.putData(
            '/curso',
            dados,
            this.montaHeaders()
          );
          this.curso = response.data;
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

    async getCursoId(_id: string) {
      try {
        if (_id.length < 2) {
          return { e: 'deu ruin' };
        }
        const response = await api.getData(
          'curso/?id=' + _id,
          this.montaHeaders()
        );
        this.curso = response.data;
      } catch (e) {
        return e;
      }
    },

    async getAll() {
      try {
        const response = await api.getData('curso/getall', this.montaHeaders());
        this.cursos = response.data;
      } catch (e) {
        return e;
      }
    },
    async deleteCurso(_id: string) {
      try {
        if (_id.length < 2) {
          return { e: 'deu ruin' };
        }
        const response = await api.deleteData(
          'curso/?id=' + _id,
          this.montaHeaders()
        );
        this.curso = response.data;
      } catch (e) {
        return e;
      }
    },
  },
});
