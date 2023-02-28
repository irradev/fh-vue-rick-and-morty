import type { RouteRecordRaw } from 'vue-router'
// import CharacterLayout from '@/modules/characters/layout/CharacterLayout.vue'
import CharacterId from '@/modules/characters/pages/CharacterId.vue'
import CharacterList from '../pages/CharacterList.vue'
import CharacterSearch from '../pages/CharacterSearch.vue'

const characterRoute: RouteRecordRaw = {
  path: '/characters',
  redirect: '/characters/list',
  component: () => import('@/modules/characters/layout/CharacterLayout.vue'),
  children: [
    {
      path: 'by/id',
      name: 'character-id',
      component: CharacterId,
      props: { title: 'Por Id', visible: false }
    },
    {
      path: 'list',
      name: 'character-list',
      component: CharacterList,
      props: { title: 'Lista', visible: true }
    },
    {
      path: 'search',
      name: 'character-search',
      component: CharacterSearch,
      props: { title: 'Búsqueda', visible: true }
    }
  ]
}

export default characterRoute
