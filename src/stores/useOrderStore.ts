import { defineStore } from 'pinia';
import api from '../boot/axios';
import OrderModel from 'src/models/Order';
export const useOrderStore = defineStore('Order', {
  state: () => ({
    order: {
      _id: '',
      name: '',
      description: '',
      product: '',
      owner: '',
      totalPrice: 0,
      title: [],
      status: '',
      detail: {
        aluno: {
          userName: '',
        },
      },
    },
    orders: [],
  }),
  getters: {},
  actions: {
    async createOrder(dados: any) {
      console.log(dados);
      try {
        const response = await api.postData(
          '/order',
          dados,
          this.montaHeaders()
        );
        this.order = response.data;
      } catch (e) {
        return e;
      }
    },

    async updateOrder(dados: any) {
      try {
        await api.putData('/order', dados, this.montaHeaders());
      } catch (e) {
        return e;
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

    async getOrder(product: string, owner?: string) {
      try {
        if (product.length < 2) {
          return { e: 'deu ruin' };
        }
        let url = 'order?owner=' + owner;
        if (owner) {
          url += '&product=' + product;
        }
        const response = await api.getData(url, this.montaHeaders());
        this.orders = response.data;
      } catch (e) {
        return e;
      }
    },

    async getOrderById(id: string) {
      try {
        const response = await api.getData(
          'order/one/' + id,
          this.montaHeaders()
        );
        this.order = response.data;
      } catch (e) {
        return e;
      }
    },
    async getAll() {
      try {
        const response = await api.getData('order/getall', this.montaHeaders());
        this.orders = response.data;
      } catch (e) {
        return e;
      }
    },
    async deleteOrder(_id: string) {
      try {
        if (_id.length < 2) {
          return { e: 'deu ruin' };
        }
        const response = await api.deleteData(
          'order/?id=' + _id,
          this.montaHeaders()
        );
        console.log(response.data);
      } catch (e) {
        return e;
      }
    },
  },
});
