<script setup lang="ts">
import { toRef } from 'vue'
import CharacterCard from '@/modules/characters/components/CharacterCard.vue'
import type { Character } from '@/modules/characters/interfaces/characters'

const props = defineProps<{ characters: Character[] }>()

const characters = toRef(props, 'characters')
</script>

<template>
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
