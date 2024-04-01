import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
/**
 * 读取./modules下的所有js文件并注册模块
 */
type RequireModule = { default: RouteRecordRaw[] };
const requireModule: Record<string, RequireModule> = import.meta.glob(
  "./modules/*.ts",
  {
    eager: true,
  }
);
const modules: RouteRecordRaw[] = [];
Object.keys(requireModule).forEach((fileName) => {
  modules.push(...requireModule[fileName].default);
});
const routes = [
  {
    path: "/",
    component: () => import("@/pages/layout/index.vue"),
    redirect: "/home",
    hidden: true,
  },
  {
    path: "/login",
    meta: {
      title: "登录",
    },
    component: () => import("@/pages/login.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    meta: {
      title: "404 Not Found",
    },
    component: () => import("@/pages/redirect/404.vue"),
  },
  ...modules,
];
const router = createRouter({
  history: createWebHashHistory(),
  // @ts-ignore
  routes,
});
export default router;
