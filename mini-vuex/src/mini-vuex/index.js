import { watch } from 'vue';
import { reactive, computed } from 'vue';

export function createStore(options) {
  // store 实例
  const store = {
    _state: reactive(options.state()),

    get state() {
      return this._state;
    },

    set state(val) {
      console.error(`please use replaceState to reset state`);
    },

    _mutations: options.mutations,
    _actions: options.actions,

    // 严格模式
    _commit: false, // 提交标识符，如果通过 commit 方式修改状态，则设置为true
    // fn 就是用户设置的mutations执行函数
    _withCommit(fn) {
      this._commit = true;
      fn();
      this._commit = false;
    },
  };

  // commit
  function commit(type, payload) {
    // 获取 type 对应 mutations
    const entry = this._mutations[type];
    if (!entry) {
      console.error(`unknow mutation type: ${type}`);
      return;
    }
    // 使用withCommit方式提交
    this._withCommit(() => {
      entry.call(this.state, this.state, payload);
    });
  }

  // dispatch
  function dispatch(type, payload) {
    // 获取用户编写的action
    const entry = this._actions[type];
    if (!entry) {
      console.error(`unknow action type: ${type}`);
      return;
    }
    entry.call(this, this, payload);
  }

  // 永久绑定 this 指向store
  store.commit = commit.bind(store);
  store.dispatch = dispatch.bind(store);

  // getter实现
  store.getters = {};
  // 遍历用户定义的getters
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

  // strict模式
  if (options.strict) {
    // 监听 store.state变化
    watch(
      store.state,
      () => {
        if (!store._commit) {
          console.warn(`please use commit to mutate state`);
        }
      },
      {
        deep: true,
        flush: 'sync',
      }
    );
  }

  // 插件（install方法）
  store.install = function (app) {
    const store = this;
    // 全局注册 $router
    app.config.globalProperties.$store = store;
  };

  return store;
}
