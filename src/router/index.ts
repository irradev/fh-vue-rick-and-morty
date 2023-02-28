import { createRouter, createWebHistory } from 'vue-router'
import characterRoute from '@/modules/characters/router'

import HomePage from '@/modules/shared/pages/HomePage.vue'
import AboutPage from '@/modules/shared/pages/AboutPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Public
    { path: '/', name: 'home', component: HomePage },
    { path: '/about', name: 'about', component: AboutPage },

    // Characters
    {
      ...characterRoute,
      path: '/characters'
    },
    // characterRoute,
    // {
    //   path: '/characters',
    //   name: 'characters',
    //   component: () => import('@/modules/characters/layout/CharacterLayout.vue')
    // },

    // Default
    { path: '/:pathMatch(.*)*', redirect: () => ({ name: 'home' }) }
  ]
})

// path: /characters
// router.addRoute(characterRoute)

export default router
