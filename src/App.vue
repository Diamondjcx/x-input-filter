<template>
  <section if="app">
    <input v-model="value" v-x-input-filter.special_character />
    <input v-model="value2" v-x-input-filter.number />
    <div>
      {{ value }}
    </div>
    <div>
      {{ value2 }}
    </div>
  </section>
</template>
<script setup>
import { ref } from "vue";
const value = ref("");
const value2 = ref("");
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
