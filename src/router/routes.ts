import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('../pages/LoginPage.vue') },
      {
        path: '/singup',
        component: () => import('../pages/SingupPage.vue'),
      },
    ],
  },
  {
    path: '/index',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/user', component: () => import('pages/UserPage.vue') },
      { path: '/curso', component: () => import('pages/CursoPage.vue') },
      { path: '/classe', component: () => import('pages/ClassePage.vue') },
      {
        path: '/classe/:id',
        component: () => import('pages/ClasseFrequenciaPage.vue'),
      },
      { path: '/order', component: () => import('pages/OrderPage.vue') },
      {
        path: '/order/:id',
        component: () => import('pages/OrderPagamentosPage.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
