import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Level1 from "@/views/Level1";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/level-1",
    component: Level1
    // component: () =>
    //   import(/* webpackChunkName: "level1" */ "../views/Level1.vue")
  },
  {
    path: "/level-2",
    component: () =>
      import(/* webpackChunkName: "level2" */ "../views/Level2.vue")
  },
  {
    path: "/level-3",
    component: () =>
      import(/* webpackChunkName: "level3" */ "../views/Level3.vue")
  },
  {
    path: "/level-4",
    component: () =>
      import(/* webpackChunkName: "level4" */ "../views/Level4.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
