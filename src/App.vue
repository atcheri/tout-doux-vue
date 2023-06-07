<script setup lang="ts">
import ToDoList from "./components/ToDoList.vue";
</script>

<template>
  <main class="container mx-auto h-screen">
    <section class="flex flex-col justify-center gap-4 items-center p-2 md:p-6">
      <a href="/">
        <img src="/logo.svg" class="h-16 w-16" alt="Tout-Doux logo" />
      </a>
      <h1 class="text-3xl font-bold">Tout-Doux List</h1>
      <h2 class="text-xl font-semibold">Powered by Vite + Vuejs 3 + TS</h2>
    </section>
    <ToDoList />
  </main>
</template>

<style scoped>
.logo {
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
</style>
