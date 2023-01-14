# mini-vuex



全局状态管理模式库



## 实现

- 统一状态存储 Store
  - state 响应式
- 可预测变更
  - store.commit(type)
  - store.dispatch()



### 过程

- 创建 store 实例， createStore(mutations, actions, state)
- 存储 mutaion、actions、state
- 封装 state，数据响应式
- 实现 commit：获取 mutations[type].call(store.state, store.state, payload)
- 实现 dispatch：获取 actions[type].call(store, store)
- 实现 getter 方法
  - 接口暴露 store.getter = {}
  - 属性动态定义

```js
Object.keys(options.getters).forEach((key) => {
  // 定义计算属性
  const result = computed(() => {
    // 值来自用户定义的getter函数返回值
    // 动态定义的store.getters.xxx
    const getter = options.getters[key];
    if (getter) {
      return getter.call(store, store.state);
    } else {
      console.error(`unknown getter type ${key}`);
      return '';
    }
  });

  Object.defineProperty(store.getters, key, {
    // 只读
    get() {
      return result;
    },
  });
});
```

- 严格模式：watch(state._commit)，封装commit函数

  
