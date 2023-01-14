# Vue-router



## 任务清单

- 单页应用 SPA 

  - H5 history API

  - hash

- 显示对应组件

  - 路由和组件映射关系
  - router-view 用来告诉哪里显示渲染组件

- 路由跳转

  - router-link
    - 处理默认插槽
    - 处理to属性

- 插件

  - createRouter 返回的的对象



## 代码

- src/mini-router



## 后续实现

- 路由守卫
- 嵌套路由
- 生命周期钩子



## 题外话

router4变化

- 实例创建
  - new VueRouter({})
  - createRouter()
- 运行模式
  - mode
    - history
    - Hash
  - History
    - createWebHistory()
    - createWebHashHistory()

