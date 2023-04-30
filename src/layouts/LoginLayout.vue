<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="row justify-center items-center altura">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
</script>

<style scoped>
.altura {
  display: flex;
  align-items: center;
  height: 100vh;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(83, 191, 218, 0.3) 200%
  );
}
</style>
