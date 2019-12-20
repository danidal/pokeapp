import { 
    SET_ERROR,
    SET_HAS_MORE,
    SET_IS_LOADING,
    SET_POKEMONS,
    SET_OFFSET,
    SET_CATCHED,
    SET_GAME_ACTIVE,
    SET_POKEMON_ENCOUNTERED
} from './constants'

const setError = (error = true) => ({
    type: SET_ERROR,
    error
})

const setHasMore = (hasMore = true) => ({
    type: SET_HAS_MORE,
    hasMore
})

const setIsLoading = (isLoading = true) => ({
    type: SET_IS_LOADING,
    isLoading
})

const setPokemons = (pokemons = []) => ({
    type: SET_POKEMONS,
    pokemons
})

const setOffset = (offset = 0) => ({
    type: SET_OFFSET,
    offset
})

const setCatched = (name = "") => ({
    type: SET_CATCHED,
    name
})

const setGameActive = (isGameActive = false) => ({
    type: SET_GAME_ACTIVE,
    isGameActive
})

const setEncountered = (encountered = "") => ({
    type: SET_POKEMON_ENCOUNTERED,
    encountered
})

export {
    setError,
    setHasMore,
    setIsLoading,
    setPokemons,
    setOffset,
    setCatched,
    setGameActive,
    setEncountered
}