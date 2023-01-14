import { defineStore } from '../mini-pinia/';

export const useCounterStore = defineStore('counter', {
  state() {
    return {
      count: 1,
    };
  },

  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
  },

  actions: {
    inc() {
      this.count++;
    },
  },
});
