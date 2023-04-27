import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}
const api = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }
});

/**
 * Methods HTTP for interactions Ajax
 */

const getData = (url: string) => {
  return api.get(url);
};

const postData = (url: string, data: any): Promise<any> => {
  return api.post(url, data);
};

const putData = (url: string, data: any) => {
  return api.put(url, data);
};

const deleteData = (url: string) => {
  return api.delete(url);
};
export default {
  getData,
  postData,
  putData,
  deleteData,
};
