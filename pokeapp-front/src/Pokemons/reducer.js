import { 
    SET_ERROR,
    SET_HAS_MORE,
    SET_IS_LOADING,
    SET_POKEMONS,
    SET_OFFSET,
    SET_CATCHED
} from './constants'

const initialState = {
    error: false,
    hasMore: true,
    isLoading: false,
    pokemons: [],
    offset: 0
}

const reducer = (
    state = initialState,
    { type, error, hasMore, isLoading, pokemons, offset, name, catched } = {}
) => {
    switch(type) {
        case SET_ERROR:
            return ({ ...state, error })

        case SET_HAS_MORE:
            return ({ ...state, hasMore })

        case SET_IS_LOADING:
            return ({ ...state, isLoading })

        case SET_POKEMONS:
            return ({ ...state, pokemons })

        case SET_OFFSET:
            return ({ ...state, offset })

        case SET_CATCHED:
            const newPokemons = state.pokemons.map(pokemon => {
                    if(pokemon.name === name) {
                        return ({ name, catched })
                    }
                    return pokemon
                })
            return ({ ...state, pokemons: newPokemons })

        default:
            return ({ ...state })
    }
}

export { reducer, initialState }