import axios from 'axios'

const rickAndMortyAPi = axios.create({
  baseURL: 'https://rickandmortyapi.com/api'
})

export default rickAndMortyAPi
