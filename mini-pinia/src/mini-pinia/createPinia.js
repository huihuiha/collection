import { markRaw } from 'vue';

export const piniaSysbol = Symbol('pinia');

export function createPinia() {
  const pinia = markRaw({
    install(app) {
      pinia._a = app;
      app.provide(piniaSysbol, pinia);
      app.config.globalProperties.$pinia = pinia;
    },

    _s: new Map(), // 存储子模块
  });

  return pinia;
}
