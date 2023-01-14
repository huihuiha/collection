# mini-vuex



`Vuex`，全局状态管理模式库



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

>  Object.keys(options.keys).forEach(key => {Objct.defineProperty(store.getters, key, {get: {options.getters[key].call(store, store.state)}})})

- 严格模式：watch(state._commit)，封装commit函数

  
