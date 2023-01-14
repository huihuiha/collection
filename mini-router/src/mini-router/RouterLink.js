import { defineComponent, h, unref } from 'vue';

export default defineComponent({
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  setup(props, { slots }) {
    return () => {
      const to = unref(props.to);
      return h('a', { href: `#${to}` }, slots.default());
    };
  },
});
