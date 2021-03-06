import Vue from "vue";
import Vuex from "vuex";
import { level } from "@/store/modules/level";
import { game } from "@/store/modules/game";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    level,
    game
  }
});
