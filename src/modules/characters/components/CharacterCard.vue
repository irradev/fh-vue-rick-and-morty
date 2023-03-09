<script setup lang="ts">
import { toRef } from 'vue'
import { useRouter } from 'vue-router'
import type { Character } from '../interfaces/characters'

// interface Props {
//   character: Character
// }

const props = defineProps<{ character: Character }>()
const character = toRef(props, 'character')

const router = useRouter()

const goTo = () => {
  router.push(`by/${character.value.id}`)
}
</script>

<template>
  <div class="character-card" @click="goTo">
    <!-- <img src="https://cdn.pixabay.com/photo/2021/06/07/13/46/user-6318005_1280.png" alt="No character image" /> -->
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
  cursor: pointer;
}

img {
  border-radius: 8px;
  /* box-shadow: 0px 2px 10px rgba(69, 207, 57, 0.534); */
  width: 150px;
  transition: all 0.3s ease;
}

img:hover {
  box-shadow: 0px 2px 10px rgba(69, 207, 57, 0.884);
  transform: translateY(-5px);
  /* transition: all 0.3s ease; */
}
</style>
