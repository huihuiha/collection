import { createStore } from '../mini-vuex';

const store = createStore({
  strict: true,
  state() {
    return {
      count: 1,
    };
  },

  mutations: {
    // 1. state 如何过去
    add(state) {
      state.count++;
    },
  },

  getters: {
    doubleCounter(state) {
      return state.count * 2;
    },
  },

  actions: {
    add({ commit }) {
      setTimeout(() => {
        commit('add');
      }, 3000);
    },
  },
});

export { store };
