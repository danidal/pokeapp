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

const initialState = {
    error: false,
    hasMore: true,
    isLoading: false,
    pokemons: [],
    offset: 0,
    name: "",
    isGameActive: false,
    encountered: ""
}

const reducer = (
    state = initialState,
    {
        type,
        error,
        hasMore,
        isLoading, 
        pokemons,
        offset,
        name: thisName,
        isGameActive,
        encountered
    } = {}
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
            const newPokemons = state.pokemons.map(({ name, quantity }) => {
                    if(name === thisName) {
                        return ({
                            name,
                            quantity: quantity + 1
                        })
                    }
                    return { name, quantity }
                })
            return ({ ...state, pokemons: newPokemons })

        case SET_GAME_ACTIVE:
            return ({ ...state, isGameActive })

        case SET_POKEMON_ENCOUNTERED:
            return ({ ...state, encountered })

        default:
            return ({ ...state })
    }
}

export { reducer, initialState }