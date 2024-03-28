import Layout from "@/pages/layout/index.vue";
export default [
  {
    path: "/home",
    component: Layout,
    meta: {},
    redirect: "/home/index",
    children: [
      {
        path: "/home/index",
        component: () => import("@/pages/home.vue"),
        meta: {},
      },
    ],
  },
  {
    path: "/create",
    component: Layout,
    meta: {},
    redirect: "/create/index",
    children: [
      {
        path: "/create/index",
        component: () => import("@/pages/crud.vue"),
        meta: {},
      },
    ],
  },
  {
    path: "/delete",
    component: Layout,
    meta: {},
    redirect: "/delete/index",
    children: [
      {
        path: "/delete/index",
        component: () => import("@/pages/home.vue"),
        meta: {},
      },
    ],
  },
  {
    path: "/update",
    component: Layout,
    meta: {},
    redirect: "/update/index",
    children: [
      {
        path: "/update/index",
        component: () => import("@/pages/home.vue"),
        meta: {},
      },
    ],
  },
  {
    path: "/read",
    component: Layout,
    meta: {},
    redirect: "/read/index",
    children: [
      {
        path: "/read/index",
        component: () => import("@/pages/home.vue"),
        meta: {},
      },
    ],
  },
];
