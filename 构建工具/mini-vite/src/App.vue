<template>
  <h1>Hello</h1>
  <div @click="handleClick">{{ count }}</div>
</template>

<script>
import { reactive, toRefs } from 'vue';

export default {
  setup() {
    const state = reactive({
      count: 0,
    });

    const handleClick = () => {
      state.count++;
    };

    return {
      ...toRefs(state),
      handleClick,
    };
  },
};
</script>
