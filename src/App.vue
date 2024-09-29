<script setup lang="ts">
import HeaderComponent from './components/HeaderComponent.vue'
</script>

<template>
  <header class="header__wrap">
    <HeaderComponent />
  </header>

  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped></style>
