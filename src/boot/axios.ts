import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}
const api = axios.create({
  baseURL: 'localhost:3001/',
});

/**
 * Methods HTTP for interactions Ajax
 */

const getData = async (url: string) => {
  return api.get(url);
};

const postData = async (url: string, data: object) => {
  return api.post(url, data);
};

const putData = async (url: string, data: object) => {
  return api.put(url, data);
};

const deleteData = async (url: string) => {
  return api.delete(url);
};
export default {
  getData,
  postData,
  putData,
  deleteData,
};
