import * as VueRouter from "vue-router";
const routes = [
  { path: "/", component: () => import('@/pages/home.vue') },
  { path: "/create", component: () => import('@/pages/crud.vue') },
  { path: "/delete", component: () => import('@/pages/home.vue') },
  { path: "/update", component: () => import('@/pages/home.vue') },
  { path: "/read", component: () => import('@/pages/home.vue') },
];
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});
export default router;
