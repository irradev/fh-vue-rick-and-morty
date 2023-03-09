<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import characterStore from '@/store/characters.store'
import rickAndMortyAPi from '@/api/rickAndMortyAPi'
import CardList from '@/modules/characters/components/CardList.vue'
import type { Character, Characters } from '../interfaces/characters'

const props = defineProps<{ title: string; visible: boolean }>()

const getCharactersCacheFirst = async (): Promise<Character[]> => {
  if (characterStore.characters.count > 0) {
    return characterStore.characters.list
  }

  const { data } = await rickAndMortyAPi.get<Characters>('/character')
  return data.results
}

useQuery(['characters'], getCharactersCacheFirst, {
  onSuccess(data) {
    characterStore.loadedCharacters(data)
  },
  onError(error) {
    console.log(error)
  }
})
</script>

<template>
  <h1>{{ props.title }}</h1>
  <h1 v-if="characterStore.characters.isLoading">Loading...</h1>
  <!-- <h1 v-if="isError">{{ error }}</h1> -->
  <template v-else>
    <CardList :characters="characterStore.characters.list || []" />
  </template>
</template>

<style scoped></style>
