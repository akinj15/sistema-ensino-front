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
      }
    },
    async createUser(dados: UserModel) {
      console.log(1111, dados.userName && dados.password && dados.profile.firstName && dados.email)
      if(dados.userName && dados.password && dados.profile.firstName && dados.email) {
        try {
          const response = await api.postData('/user', dados);
          this.user = response.data;
        } catch (e) {
          return e;
        }
      }
    },
  },
});
