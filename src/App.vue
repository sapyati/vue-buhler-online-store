<script setup lang="ts">
import AppHeader from './components/header/AppHeader.vue';
import "./App.scss";
</script>

<template>
  <AppHeader />
  <main class="page-content">
    <RouterView />
  </main>
</template>
