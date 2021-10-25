import Vue from "vue";
import VueRouter from "vue-router";
import Schedule from "@/views/Schedule";
import store from "@/store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Schedule",
    component: Schedule,
  },
  {
    path: "/people",
    name: "People",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "people" */ "../views/People.vue"),
    children: [
      {
        path: "clubs",
        component: () =>
          import(/* webpackChunkName: "clubs" */ "../views/People/Clubs.vue"),
        children: [
          {
            path: ":id",
            component: () =>
              import(
                /* webpackChunkName: "clubs" */ "../views/People/Clubs/club.vue"
              ),
          },
          {
            path: "",
            component: () =>
              import(
                /* webpackChunkName: "clubs" */ "../views/People/placeholder.vue"
              ),
          },
        ],
      },
      {
        path: "staff",
        component: () =>
          import(/* webpackChunkName: "staff" */ "../views/People/Staff.vue"),
        children: [
          {
            path: ":id",
            component: () =>
              import(
                /* webpackChunkName: "staff" */ "../views/People/Staff/staff.vue"
              ),
          },
          {
            path: "",
            component: () =>
              import(
                /* webpackChunkName: "clubs" */ "../views/People/placeholder.vue"
              ),
          },
        ],
      },
      {
        path: "",
        component: () =>
          import(
            /* webpackChunkName: "clubs" */ "../views/People/placeholder.vue"
          ),
      },
    ],
  },
  {
    path: "/todo",
    name: "Todo",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "todo" */ "../views/Todo.vue"),
  },
  {
    path: "/settings",
    name: "Settings",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "settings" */ "../views/Settings"),
  },
  {
    path: "/utilities",
    name: "Utilities",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "util" */ "../views/Utilities"),
  },
  {
    path: "/make-psa",
    name: "PSA Maker",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "util" */ "../views/makePSA.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

const waitForStorageToBeReady = async (to, from, next) => {
  await store.restored;
  next();
};
router.beforeEach(waitForStorageToBeReady);

export default router;
