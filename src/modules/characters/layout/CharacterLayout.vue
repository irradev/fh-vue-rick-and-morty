<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/modules/shared/components/NavBar.vue'
import type { RouteLink } from '@/router/link-routes'
import characterRoute from '../router/index'

interface CastRoute {
  title: string
  visible: boolean
}

const routeLinks: RouteLink[] = characterRoute
  .children!.filter((route) => (route.props as CastRoute).visible)
  .map((route) => ({
    name: route.name as string,
    path: route.path,
    title: (route.props as CastRoute).title
  }))
</script>
<template>
  <h1>Personajes</h1>

  <NavBar :show-icon="false" :links="routeLinks" />
  <RouterView />
</template>

<style scoped></style>
