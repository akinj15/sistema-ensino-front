import { defineStore } from 'pinia';
import api from '../boot/axios';
import UserModel from '../models/User';
export const useLoginStore = defineStore('login', {
  state: () => ({
    user: {
      userName: String,
      password: String,
      token: String,
      _id: String,
      email: String,
      role: Array,
      profile: {
        firstName: String,
        lastName: String,
        bio: String,
        description: String,
      },
    },
    userName: String,
    password: String,
    token: String,
    _id: String,
    email: String,
  }),
  getters: {},
  actions: {
    async login(dados: any) {
      if (dados.user && dados.password) {
        const dadosEnvio = {
          userName: dados.userName,
          password: dados.password,
        };
        console.log(dados, 111);
        let response: any;
        try {
          window.localStorage.clear();
          response = await api.postData('/user/login', dadosEnvio);

          window.localStorage.setItem('session', response.data.token);
        } catch (e) {
          return e;
        }
      }
    },
    async createUser(dados: UserModel) {
      if (!dados)
        try {
          window.localStorage.clear();
          const response = await api.postData('/user', dados);
          this.user = response.data;
          window.localStorage.setItem('session', response.data.token);
        } catch (e) {
          return e;
        }
    },
  },
});
