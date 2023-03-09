import { ref, computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import type { Character } from '@/modules/characters/interfaces/characters'
import rickAndMortyAPi from '@/api/rickAndMortyAPi'

const characterSet = ref<{ [id: string]: Character }>({})
const hasError = ref<boolean>(false)
const errorMessage = ref<string | null>(null)

const getCharacter = async (id: string): Promise<Character> => {
  if (characterSet.value[id]) {
    return characterSet.value[id]
  }

  try {
    const { data } = await rickAndMortyAPi.get<Character>(`/character/${id}`)
    if (data) return data
    throw new Error(`No se encontró un personaje con el id ${id}`)
  } catch (error: any) {
    throw new Error(error)
  }
}

const loadedCharacter = (character: Character) => {
  hasError.value = false
  errorMessage.value = null
  characterSet.value[character.id] = character
}

const loadedWithError = (error: string) => {
  hasError.value = true
  errorMessage.value = error
}

const useCharacter = (id: string) => {
  const { isLoading } = useQuery(['character', id], () => getCharacter(id), {
    onSuccess: loadedCharacter,
    onError: loadedWithError
  })

  const getEpisodeNumber = computed((): string[] => {
    const episodesList: string[] = []

    characterSet.value[id].episode.forEach((link) => {
      const linkSplitted = link.split('/')
      episodesList.push(linkSplitted[linkSplitted.length - 1])
    })

    return episodesList
  })

  return {
    // Properties
    list: characterSet,
    hasError,
    errorMessage,
    isLoading,

    // Getters
    character: computed<Character | null>(() => characterSet.value[id]),

    // Methods
    getEpisodeNumber
  }
}

export default useCharacter
