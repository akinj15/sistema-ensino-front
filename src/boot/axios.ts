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
    'Accept-Encoding': 'gzip, deflate, br',
    Accept: 'application/json, text/plain, */*',
  },
});

/**
 * Methods HTTP for interactions Ajax
 */

const getData = (url: string, config?: any) => {
  return api.get(url, config);
};

const postData = (url: string, data: any, config?: any): Promise<any> => {
  return api.post(url, data, config);
};

const putData = (url: string, data: any, config?: any) => {
  return api.put(url, data, config);
};

const deleteData = (url: string, config?: any) => {
  return api.delete(url, config);
};
export default {
  getData,
  postData,
  putData,
  deleteData,
};
