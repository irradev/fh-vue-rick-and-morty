import rickAndMortyAPi from '@/api/rickAndMortyAPi'
import type { Characters, Character } from '@/modules/characters/interfaces/characters'
import { reactive } from 'vue'

interface Store {
  characters: {
    list: Character[]
    count: number
    isLoading: boolean
    hasError: boolean
    errorMessage: string | null
  }
  ids: {
    list: {
      [id: string]: Character
    }
    isLoading: boolean
    hasError: boolean
    errorMessage: string | null
  }

  // Métodos de Characters
  startLoadingCharacters: () => void
  loadedCharacters: (data: Character[]) => void
  loadedCharactersFailed: (error: string) => void

  // Métodos de Characters por IDs
  startLoadingCharacter: () => void
  checkIdInStore: (id: string) => boolean
  loadedCharacter: (character: Character) => void
}

// Initial State
const characterStore = reactive<Store>({
  characters: {
    count: 0,
    errorMessage: null,
    hasError: false,
    isLoading: true,
    list: []
  },
  ids: {
    errorMessage: null,
    hasError: false,
    isLoading: true,
    list: {}
  },

  // Métodos de Characters
  async startLoadingCharacters() {
    // console.log('start loading Characters')
    const { data } = await rickAndMortyAPi.get<Characters>('/character')
    this.loadedCharacters(data.results)
  },
  loadedCharacters(data: Character[]) {
    // this.characters.count = data.length
    // this.characters.list = data;
    this.characters = {
      errorMessage: null,
      hasError: false,
      isLoading: false,
      count: data.length,
      list: data
    }
  },
  loadedCharactersFailed(error: string) {
    this.characters = {
      count: 0,
      errorMessage: error,
      hasError: true,
      isLoading: false,
      list: []
    }
  },

  // Métodos de Characters por IDs
  startLoadingCharacter() {
    this.ids = {
      ...this.ids,
      isLoading: true,
      hasError: false,
      errorMessage: null
    }
  },
  checkIdInStore(id: string) {
    return !!this.ids.list[id]
  },
  loadedCharacter(character: Character) {
    this.ids.isLoading = false
    this.ids.list[character.id] = character
  }
})

characterStore.startLoadingCharacters()

export default characterStore
