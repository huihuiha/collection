<script setup>
import { useCounterStore } from '../store/counter';
const counter = useCounterStore();
</script>

<template>
  <h1>{{ counter.count }} --- {{ counter.doubleCount }}</h1>
  <button @click="counter.count++">++</button>
  <button @click="counter.inc()">++</button>
  <!-- 更新多个属性 -->
  <button @click="counter.$patch({ count: counter.count + 1 })">++</button>
  <button @click="counter.$patch((state) => state.count++)">++</button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
