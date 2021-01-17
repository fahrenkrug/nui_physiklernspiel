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
    path: "/games/:slug",
    component: () => import(/* webpackChunkName: "game" */ "../views/Game.vue")
  },
  {
    path: "/games/catapult/levels/1",
    component: () =>
      import(
        /* webpackChunkName: "catapultLevel1" */ "../views/catapult/Level1"
      )
  },
  {
    path: "/games/catapult/levels/2",
    component: () =>
      import(
        /* webpackChunkName: "catapultLevel2" */ "../views/catapult/Level2"
      )
  },
  {
    path: "/games/catapult/levels/3",
    component: () =>
      import(
        /* webpackChunkName: "catapultLevel3" */ "../views/catapult/Level3"
      )
  },
  {
    path: "/games/marble/levels/1",
    component: () =>
      import(/* webpackChunkName: "marbleLevel1" */ "../views/marble/Level1")
  },
  {
    path: "/games/marble/levels/2",
    component: () =>
      import(/* webpackChunkName: "marbleLevel2" */ "../views/marble/Level2")
  },
  {
    path: "/games/marble/levels/3",
    component: () =>
      import(/* webpackChunkName: "marbleLevel3" */ "../views/marble/Level3")
  },
  {
    path: "/games/slingshot/levels/1",
    component: () =>
      import(
        /* webpackChunkName: "slingshotLevel1" */ "../views/slingshot/Level1"
      )
  },
  {
    path: "/games/slingshot/levels/2",
    component: () =>
      import(
        /* webpackChunkName: "slingshotLevel2" */ "../views/slingshot/Level2"
      )
  },
  {
    path: "/games/slingshot/levels/3",
    component: () =>
      import(
        /* webpackChunkName: "slingshotLevel3" */ "../views/slingshot/Level3"
      )
  },
  {
    path: "/games/colors/levels/1",
    component: () =>
      import(/* webpackChunkName: "colorsLevel1" */ "../views/colors/Level1")
  },
  {
    path: "/games/colors/levels/2",
    component: () =>
      import(/* webpackChunkName: "colorsLevel2" */ "../views/colors/Level2")
  },
  {
    path: "/games/colors/levels/3",
    component: () =>
      import(/* webpackChunkName: "colorsLevel3" */ "../views/colors/Level3")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
