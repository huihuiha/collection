import { defineComponent, h, getCurrentInstance, unref } from 'vue';

export default defineComponent({
  setup() {
    return () => {
      // 获取组件实例
      const {
        proxy: { $router },
      } = getCurrentInstance();
      // 获取要渲染的组件
      let component;
      const route = $router.options.routes.find(
        (route) => route.path === unref($router.current)
      );

      // 找到匹配的组件爱你
      if (route) {
        component = route.component;
        return h(component, 'router-view');
      } else {
        console.warn(`no match component`);
        return h('div', '');
      }
    };
  },
});
