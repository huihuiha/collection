# mobx-react的最佳实践

- 将 `ajax`请求抽离出去，不写在 `store` 内部
- 把业务逻辑也写在store里面，不写在组件内部，这样更加容易复用
- 通过`Provider`和 `inject`的形式注入`store`，不应该直接在组件中通过引入对应的`store`
  - 违反了  UI = f(state, props) 的组件设计理念

```tsx
const searchStore = new SearchStore();

const app = (
  <Provider searchStore={searchStore}>
    <SearchInput />
  </Provider>
);

ReactDom.render(app, container);
```

- 为了维护性，只允许store改变内部的状态
- 多使用 @computed 计算属性