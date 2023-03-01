<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/modules/shared/components/NavBar.vue'
import { routeLinks } from '@/router/link-routes'
</script>

<template>
  <div class="wrapper">
    <header>
      <!--Navbar -->
      <NavBar title="Rick And Morty" :links="routeLinks" />
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}
</style>
