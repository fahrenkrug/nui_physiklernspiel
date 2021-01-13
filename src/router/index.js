import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/levels/1",
    component: () =>
      import(/* webpackChunkName: "level1" */ "../views/Level1.vue")
  },
  {
    path: "/levels/2",
    component: () =>
      import(/* webpackChunkName: "level2" */ "../views/Level2.vue")
  },
  {
    path: "/levels/3",
    component: () =>
      import(/* webpackChunkName: "level3" */ "../views/Level3.vue")
  },
  {
    path: "/levels/4",
    component: () =>
      import(/* webpackChunkName: "level4" */ "../views/Level4.vue")
  },
  {
    path: "/levels/5",
    component: () =>
      import(/* webpackChunkName: "level5" */ "../views/Level5.vue")
  },
  {
    path: "/profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
