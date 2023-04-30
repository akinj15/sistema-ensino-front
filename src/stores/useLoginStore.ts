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
    users: [],
  }),
  getters: {},
  actions: {
    async login(email: string, password: string) {
      if (email && password) {
        const dadosEnvio = {
          email: email,
          password: password,
        };
        window.localStorage.clear();
        const response = await api.postData('/user/login', dadosEnvio);
        this.user = response.data.user;
        window.localStorage.setItem('token', response.data.token);
        window.localStorage.setItem('id', response.data.user._id);
      }
    },
    async createUser(dados: UserModel) {
      if (
        dados.userName &&
        dados.password &&
        dados.profile.firstName &&
        dados.email
      ) {
        try {
          const response = await api.postData('/user', dados);
          this.user = response.data;
        } catch (e) {
          return e;
        }
      }
    },
    async updateUser(dados: any) {
      console.log('--->', dados);
      if (dados.userName && dados.profile.firstName && dados._id) {
        try {
          console.log(dados, 'mopa');
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
    async getUserId() {
      const token: string = window.localStorage.getItem('token') || '';
      const _id: string = window.localStorage.getItem('id') || '';
      console.log('-->', _id);
      try {
        if (!_id) throw new Error('caiu');
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
    async geTodes() {
      const token: string = window.localStorage.getItem('token') || '';
      try {
        const response = await api.getData(
          'user/getall',
          this.montaHeaders(token)
        );
        console.log('-->', response);
        this.users = response.data;
      } catch (e) {
        return e;
      }
    },
  },
});
