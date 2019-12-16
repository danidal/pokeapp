/* import produce from 'immer' */
import { 
    SET_ERROR,
    SET_HAS_MORE,
    SET_IS_LOADING,
    SET_POKEMONS,
    SET_OFFSET
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
    { type, error, hasMore, isLoading, pokemons, offset } = {}
) => {
    switch(type) {
        case SET_ERROR:
            return ({
                ...state,
                error
            })
        case SET_HAS_MORE:
            return ({
                ...state,
                hasMore
            })
        case SET_IS_LOADING:
            return ({
                ...state,
                isLoading
            })
        case SET_POKEMONS:
            return ({
                ...state,
                pokemons
            })
        case SET_OFFSET:
            return ({
                ...state,
                offset
            })
        default:
            return ({...state})
    }
}

/* const reducer = (
    state = initialState,
    { type, error, hasMore, isLoading, users } = {}
) => produce(state, draft => {
        switch(type) {
            case SET_ERROR:
                draft.error = error
                break
            case SET_HAS_MORE:
                draft.hasMore = hasMore
                break
            case SET_IS_LOADING:
                draft.isLoading = isLoading
                break
            case SET_USERS:
                draft.users = users
                break
            case SET_OFFSET:
                draft.offset = offset
                break
            default:
                break
        }
    }) */

export { reducer, initialState }