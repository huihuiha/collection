<template>
  <div>{{ title }}</div>
</template>

<script>
import { reactive, toRefs } from 'vue';

export default {
  setup() {
    const state = reactive({
      title: 'hello vite',
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>
