<script setup lang="ts">
import type { RouteLink } from '@/router/link-routes'

interface NavBarProps {
  title?: string
  links: RouteLink[]
  showIcon?: boolean
}

const props = withDefaults(defineProps<NavBarProps>(), {
  showIcon: true
  // links: () => []
})
</script>

<template>
  <nav>
    <img v-if="props.showIcon" src="@/assets/logo.svg" alt="Vue Logo" height="25" width="25" />
    <span v-if="props.title">{{ props.title }}</span>

    <RouterLink v-for="link in links" :key="link.name" :to="link.path">
      {{ link.title }}
    </RouterLink>
  </nav>
</template>
<style scoped>
nav {
  display: flex;
  align-items: center;
  font-size: 12px;
  text-align: center;
  margin-top: 10px;
  width: 100%;
}

img {
  margin-right: 10px;
}

span {
  margin-right: 10px;
}

a {
  margin-right: 5px;
}
</style>
