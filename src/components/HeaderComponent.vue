<template>
  <div class="header">
    <div class="container">
      <h1 class="logo"><nuxt-link to="/">Covidometro</nuxt-link></h1>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.header {
  height: 70px;
  padding: 15px;
  box-shadow: 0 3px 4px $color-shadow;
  background-color: #fff;
  .logo {
    width: 164px;
    height: 40px;
    font-size: 0;
    background-image: url('@/assets/images/logo.png');
  }
}
</style>
