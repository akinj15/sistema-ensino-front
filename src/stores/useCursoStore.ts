import { defineStore } from 'pinia';
import api from '../boot/axios';
import UserModel from '../models/User';
export const useCursoStore = defineStore('Curso', {
  state: () => ({
    curso: {
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
    cursos: [],
  }),
  getters: {},
  actions: {
    async login(user: string, password: string) {
      if (user && password) {
        const dadosEnvio = {
          userName: user,
          password: password,
        };
        window.localStorage.clear();
        const response = await api.postData('/user/login', dadosEnvio);
        this.user = response.data.user;
        window.localStorage.setItem('token', response.data.token);
        window.localStorage.setItem('id', response.data.user._id);
      }
    },

    async createCurso(dados: UserModel) {
      try {
        const response = await api.postData('/user', dados);
        this.user = response.data;
      } catch (e) {
        return e;
      }
    },

    async updateCurso(dados: any) {
      if (dados.userName && dados.profile.firstName && dados._id) {
        try {
          const token: string = window.localStorage.getItem('token') || '';
          const response = await api.putData(
            '/user',
            dados,
            this.montaHeaders(token)
          );
          this.user = response.data;
        } catch (e) {
          return e;
        }
      } else {
        throw new Error('preencha todas as informações');
      }
    },

    montaHeaders(token: string) {
      return {
        headers: {
          Authorization: `Basic ${token}`,
        },
      };
    },

    async getCursoId() {
      const token: string = window.localStorage.getItem('token') || '';
      const _id: string = window.localStorage.getItem('id') || '';
      try {
        if (_id.length < 2) {
          console.log('-->', _id);
          return { e: 'deu ruin' };
        }
        const response = await api.getData(
          'user/?id=' + _id,
          this.montaHeaders(token)
        );
        console.log('-->', response);
        this.user = response.data;
      } catch (e) {
        return e;
      }
    },

    async getTodes() {
      const token: string = window.localStorage.getItem('token') || '';
      try {
        const response = await api.getData(
          'curso/getall',
          this.montaHeaders(token)
        );
        console.log('-->', response);
        this.curso = response.data;
      } catch (e) {
        return e;
      }
    },
  },
});
