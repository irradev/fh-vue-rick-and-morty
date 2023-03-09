<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import rickAndMortyAPi from '@/api/rickAndMortyAPi'
// import { useCharacters } from '@/modules/characters/composables/useCharacters'
import CharacterCard from '@/modules/characters/components/CharacterCard.vue'
import type { Characters, Character } from '@/modules/characters/interfaces/characters'

//! 1 - Normal suspense
// const {
//   data: { results: characters }
// } = await rickAndMortyAPi.get<Characters>('/character')
// const characters = ref<Character[]>([data.results])

//! 2 - Composable functions
// const { isLoading, characters, hasError, errorMessage } = useCharacters()

//! 3 - TanStack Query
const getCharactersSlow = async (): Promise<Character[]> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const data = await rickAndMortyAPi.get<Characters>('/character')
      resolve(data.data.results)
    }, 1)
  })
}

const {
  isLoading,
  isError,
  data: characters,
  error
} = useQuery(['characters'], getCharactersSlow, {
  // ? Si activamos estas opciones, sobrescribirán las globales.
  cacheTime: 1000 * 60,
  refetchOnReconnect: true
})
</script>

<template>
  <h1 v-if="isLoading">Loading...</h1>
  <!-- <h1 v-if="isError">{{ error }}</h1> -->
  <div class="card-list">
    <CharacterCard v-for="character of characters" :key="character.id" :character="character" />
  </div>
</template>

<style scoped>
.card-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
