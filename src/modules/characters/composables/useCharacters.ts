import { onMounted, ref } from 'vue'
import rickAndMortyAPi from '@/api/rickAndMortyAPi'
import type { Character, Characters } from '../interfaces/characters'
import axios from 'axios'

const characters = ref<Character[]>([])
const isLoading = ref<boolean>(true)
const hasError = ref<boolean>(false)
const errorMessage = ref<string>()

export const useCharacters = () => {
  onMounted(() => {
    loadCharacters()
  })

  const loadCharacters = async () => {
    if (characters.value.length > 0) return

    try {
      const {
        data: { results }
      } = await rickAndMortyAPi.get<Characters>('/character')
      characters.value = results
      isLoading.value = false
    } catch (error) {
      hasError.value = true
      isLoading.value = false

      if (axios.isAxiosError(error)) {
        return (errorMessage.value = error.message)
      }

      errorMessage.value = JSON.stringify(error)
    }
  }

  return {
    characters,
    isLoading,
    hasError,
    errorMessage
  }
}
