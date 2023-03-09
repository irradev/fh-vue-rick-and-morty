<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import rickAndMortyAPi from '@/api/rickAndMortyAPi'
import characterStore from '@/store/characters.store'
import type { Character } from '@/modules/characters/interfaces/characters'
import { computed } from 'vue'

const route = useRoute()
// ? ojo: al extraer con destructuración, pierde "reactividad"
const { id } = route.params as { id: string }

const getCharacterCacheFirst = async (characterId: string): Promise<Character> => {
  if (characterStore.checkIdInStore(characterId)) {
    return characterStore.ids.list[characterId]
  }

  const { data } = await rickAndMortyAPi.get<Character>(`/character/${characterId}`)
  return data
}

const { data: character } = useQuery(['character', id], () => getCharacterCacheFirst(id), {
  onSuccess(character) {
    characterStore.loadedCharacter(character)
  }
})

const getEpisodeNumber = computed((): string[] => {
  const episodesList: string[] = []

  character.value?.episode.forEach((link) => {
    let linkSplitted = link.split('/')
    episodesList.push(linkSplitted[linkSplitted.length - 1])
  })

  return episodesList
})
</script>

<template>
  <h1 v-if="!character">Loading...</h1>
  <div v-else>
    <h1>{{ character.name }}</h1>
    <div class="character-container">
      <img :src="character.image" :alt="character.name" />
      <ul>
        <li>Location: {{ character.location.name }}</li>
        <li>Género: {{ character.gender }}</li>
        <li>Origen: {{ character.origin.name }}</li>
        <li>Especie: {{ character.species }}</li>
        <li>Estatus: {{ character.status }}</li>
        <li>Episodios donde aparece: {{ getEpisodeNumber.join(', ') }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.character-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

img {
  width: 150px;
  border-radius: 5px;
}
</style>
