import { ref, computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import type { Character, Characters } from '@/modules/characters/interfaces/characters'
import rickAndMortyAPi from '@/api/rickAndMortyAPi'

const characters = ref<Character[]>([])
const hasError = ref<boolean>(false)
const errorMessage = ref<string | null>(null)

const getCharacters = async (): Promise<Character[]> => {
  if (characters.value.length > 0) {
    return characters.value
  }

  const { data } = await rickAndMortyAPi.get<Characters>('/character')
  return data.results
}

const loadedCharacters = (data: Character[]) => {
  hasError.value = false
  errorMessage.value = null
  characters.value = data
}

const onError = (error: string) => {
  hasError.value = true
  errorMessage.value = error
}

const useCharacters = () => {
  const { isLoading } = useQuery(['characters'], getCharacters, {
    onSuccess: loadedCharacters,
    onError
  })

  return {
    // Properties
    characters,
    errorMessage,
    hasError,
    isLoading,

    // Getters
    count: computed(() => characters.value.length)

    // Methods
  }
}

export default useCharacters
