<script setup lang="ts">
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useCharacter from '@/modules/characters/composables/useCharacter'

const router = useRouter()
const route = useRoute()

// ? ojo: al extraer con destructuración, pierde "reactividad"
const { id } = route.params as { id: string }

const { isLoading, list, character, hasError, errorMessage, getEpisodeNumber } = useCharacter(id)

// ? watchEffect, para observar todas las variables reactivas
// ? watch, para observar una variable reactiva
watch(hasError, () => {
  if (hasError) {
    router.replace('/characters')
  }
})
/**
 // ? para estar al pendiente de propiedades más profundas en un objeto
 // ? se usará la opción de deep:true -> {id, episodes: {id, link}} 
 watch(prop, () => {}, {deep:true}) 
 */
</script>

<template>
  <h1 v-if="isLoading">Loading...</h1>
  <h1 v-else-if="hasError">{{ errorMessage }}</h1>
  <h1 v-else-if="!character">No se encontró el personaje</h1>
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
