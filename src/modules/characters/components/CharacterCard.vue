<script setup lang="ts">
import { toRef } from 'vue'
import type { Character } from '../interfaces/characters'

// interface Props {
//   character: Character
// }

const props = defineProps<{ character: Character }>()

const character = toRef(props, 'character')
</script>

<template>
  <div class="character-card">
    <img :src="character.image" :alt="character.name" />
    <h3>{{ character.name }}</h3>
  </div>
</template>

<style lang="css" scoped>
.character-card {
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 0px 5px 10px;
}

img {
  border-radius: 5px 5px 0px 0px;
  box-shadow: 0px 2px 10px rgba(255, 255, 255, 0.1);
  width: 150px;
}
</style>
