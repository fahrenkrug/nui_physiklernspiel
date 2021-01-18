import Vue from "vue";
import { GAME_IDENTIFIER } from "@/store/modules/game";

const levels = [
  {
    number: 1,
    name: "Das Katapult",
    description:
      "Schaffst du es, das Geschoss auf die Zielplatform zu befördern?",
    image:
      "https://images.unsplash.com/photo-1607988795691-3d0147b43231?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OXx8cGh5c2ljc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    achieved: false,
    canBeAccessed: true,
    gameIdentifier: GAME_IDENTIFIER.CATAPULT
  },
  {
    number: 2,
    name: "Das Katapult 2",
    description:
      "Hier lernt man wirklich einiges. Lorem ipusm Lorem ipusm Lorem ipusm Lorem ipusm Lorem ipusm.",
    image:
      "https://images.unsplash.com/photo-1607988795691-3d0147b43231?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OXx8cGh5c2ljc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    achieved: false,
    canBeAccessed: false,
    gameIdentifier: GAME_IDENTIFIER.CATAPULT
  },
  {
    number: 3,
    name: "Das Katapult 3",
    description:
      "Hier lernt man wirklich einiges. Lorem ipusm Lorem ipusm Lorem ipusm Lorem ipusm Lorem ipusm.",
    image:
      "https://images.unsplash.com/photo-1607988795691-3d0147b43231?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OXx8cGh5c2ljc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    achieved: false,
    canBeAccessed: false,
    gameIdentifier: GAME_IDENTIFIER.CATAPULT
  },
  {
    number: 1,
    name: "Das große Rollen",
    description:
      "Werden die Murmeln mit deiner Hilfe das Ziel erreichen können?",
    image:
      "https://images.unsplash.com/photo-1453733190371-0a9bedd82893?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGh5c2ljc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    achieved: false,
    canBeAccessed: true,
    gameIdentifier: GAME_IDENTIFIER.MARBLE
  },
  {
    number: 2,
    name: "Das große Rollen",
    description:
      "Werden die Murmeln mit deiner Hilfe das Ziel erreichen können?",
    image:
      "https://images.unsplash.com/photo-1453733190371-0a9bedd82893?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGh5c2ljc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    achieved: false,
    canBeAccessed: false,
    gameIdentifier: GAME_IDENTIFIER.MARBLE
  },
  {
    number: 3,
    name: "Das große Rollen",
    description:
      "Werden die Murmeln mit deiner Hilfe das Ziel erreichen können?",
    image:
      "https://images.unsplash.com/photo-1453733190371-0a9bedd82893?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGh5c2ljc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    achieved: false,
    canBeAccessed: false,
    gameIdentifier: GAME_IDENTIFIER.MARBLE
  },
  {
    number: 4,
    name: "Das große Rollen",
    description:
      "Werden die Murmeln mit deiner Hilfe das Ziel erreichen können?",
    image:
      "https://images.unsplash.com/photo-1453733190371-0a9bedd82893?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGh5c2ljc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    achieved: false,
    canBeAccessed: false,
    gameIdentifier: GAME_IDENTIFIER.MARBLE
  },
  {
    number: 1,
    name: "Die Schleuder",
    description:
      "Hier lernt man wirklich einiges. Lorem ipusm Lorem ipusm Lorem ipusm Lorem ipusm Lorem ipusm.",
    image:
      "https://images.unsplash.com/photo-1591306208574-969f12f1ebfe?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cGh5c2ljc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    achieved: false,
    canBeAccessed: true,
    gameIdentifier: GAME_IDENTIFIER.SLINGSHOT
  },
  {
    number: 2,
    name: "Die Schleuder 2",
    description:
      "Hier lernt man wirklich einiges. Lorem ipusm Lorem ipusm Lorem ipusm Lorem ipusm Lorem ipusm.",
    image:
      "https://images.unsplash.com/photo-1591306208574-969f12f1ebfe?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cGh5c2ljc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    achieved: false,
    canBeAccessed: false,
    gameIdentifier: GAME_IDENTIFIER.SLINGSHOT
  },
  {
    number: 3,
    name: "Die Schleuder 3",
    description:
      "Hier lernt man wirklich einiges. Lorem ipusm Lorem ipusm Lorem ipusm Lorem ipusm Lorem ipusm.",
    image:
      "https://images.unsplash.com/photo-1591306208574-969f12f1ebfe?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cGh5c2ljc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    achieved: false,
    canBeAccessed: false,
    gameIdentifier: GAME_IDENTIFIER.SLINGSHOT
  },
  {
    number: 1,
    name: "Farben mischen",
    description:
      "Hier lernt man wirklich einiges. Lorem ipusm Lorem ipusm Lorem ipusm Lorem ipusm Lorem ipusm.",
    image:
      "https://images.unsplash.com/photo-1589149098258-3e9102cd63d3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cGh5c2ljc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    achieved: false,
    canBeAccessed: true,
    gameIdentifier: GAME_IDENTIFIER.COLORS
  },
  {
    number: 2,
    name: "Farbmischung Deluxe",
    description:
      "Hier lernt man wirklich einiges. Lorem ipusm Lorem ipusm Lorem ipusm Lorem ipusm Lorem ipusm.",
    image:
      "https://images.unsplash.com/photo-1589149098258-3e9102cd63d3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cGh5c2ljc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    achieved: false,
    canBeAccessed: true,
    gameIdentifier: GAME_IDENTIFIER.COLORS
  },
  {
    number: 3,
    name: "Mischen Impossible",
    description:
      "Hier lernt man wirklich einiges. Lorem ipusm Lorem ipusm Lorem ipusm Lorem ipusm Lorem ipusm.",
    image:
      "https://images.unsplash.com/photo-1589149098258-3e9102cd63d3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cGh5c2ljc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    achieved: false,
    canBeAccessed: true,
    gameIdentifier: GAME_IDENTIFIER.COLORS
  }
];

const createFindExpression = (
  numberToSearchFor,
  gameIdentifierToSearchFor
) => ({ number, gameIdentifier }) =>
  number === numberToSearchFor && gameIdentifier === gameIdentifierToSearchFor;

export const level = {
  namespaced: true,
  state: {
    levels: []
  },
  mutations: {
    DID_ACHIEVE_LEVEL: (
      state,
      { number: levelNumberToEdit, gameIdentifier }
    ) => {
      const findExpression = createFindExpression(
        levelNumberToEdit,
        gameIdentifier
      );
      const level = state.levels.find(findExpression);
      if (!level) {
        throw new Error(
          `Level with number ${levelNumberToEdit} doesn't exists.`
        );
      }
      level.achieved = true;
      const index = state.levels.findIndex(findExpression);
      Vue.set(state.levels, index, level);
    },
    SET_LEVEL_ACCESS: (state, { number: levelNumber, gameIdentifier }) => {
      const findExpression = createFindExpression(levelNumber, gameIdentifier);
      const index = state.levels.findIndex(findExpression);
      if (!index < 0) {
        return;
      }
      const level = state.levels[index];
      level.canBeAccessed = true;
      Vue.set(state.levels, index, level);
    },
    SET_LEVELS: state => {
      state.levels = localStorage.getItem("levels")
        ? JSON.parse(localStorage.getItem("levels"))
        : levels;
    }
  },
  actions: {
    didAchieveLevel: ({ commit, state }, payload) => {
      commit("DID_ACHIEVE_LEVEL", payload);
      commit("SET_LEVEL_ACCESS", {
        ...payload,
        number: payload.number + 1
      });
      localStorage.setItem("levels", JSON.stringify(state.levels));
      return Promise.resolve();
    },
    onLoad: ({ commit }) => {
      commit("SET_LEVELS");
      return Promise.resolve();
    }
  }
};
