<script setup>
import HelloWorld from './components/HelloWorld.vue';
</script>

<template>
  <div @click="$store.commit('add')">{{ $store.state.count }}</div>
  <div @click="$store.state.count++">{{ $store.state.count }}</div>
  <div @click="$store.dispatch('add')">async: {{ $store.state.count }}</div>
  <div>doubleCounter: {{ $store.getters.doubleCounter }}</div>
</template>

<style scoped></style>
