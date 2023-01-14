// import { createRouter, createWebHashHistory } from 'vue-router';
import { createRouter } from '../mini-router';

// 1.引入页面组件
import Home from '../views/Home.vue';
import About from '../views/About.vue';

// 2.定义路由映射关系
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
];

// 3.创建router实例
const router = createRouter({
  //   history: createWebHashHistory(),
  routes,
});

export default router;
