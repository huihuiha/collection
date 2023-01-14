import { reactive, toRefs, computed, getCurrentInstance, inject } from 'vue';
import { piniaSysbol } from './createPinia';

export function defineStore(id, options) {
  const { state: stateFn, actions, getters } = options;
  const state = reactive(stateFn());

  function useStore() {
    // 获取组件实例
    const currentInstance = getCurrentInstance();
    // 获取pinia实例
    const pinia = currentInstance && inject(piniaSysbol);

    console.log(pinia);

    // 如果不存在，则创建
    if (!pinia._s.has(id)) {
      pinia._s.set(
        id,
        reactive({
          ...toRefs(state),
          // 动态添加 getters 属性
          ...Object.keys(getters || {}).reduce((computedGetters, name) => {
            computedGetters[name] = computed(() => {
              return getters[name].call(store, store);
            });
            return computedGetters;
          }, {}),
          // 动态添加action属性
          ...Object.keys(actions || {}).reduce((wrapperActions, actionName) => {
            wrapperActions[actionName] = () => actions[actionName].call(store);
            return wrapperActions;
          }, {}),
          $patch(partialStateOrMutator) {
            if (typeof partialStateOrMutator === 'object') {
              Object.keys(partialStateOrMutator).forEach((key) => {
                state[key] = partialStateOrMutator[key];
              });
            } else {
              partialStateOrMutator.call(store, store);
            }
          },
        })
      );
    }
    const store = pinia._s.get(id);
    return store;
  }
  return useStore;
}
