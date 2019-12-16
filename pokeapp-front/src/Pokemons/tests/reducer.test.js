import { reducer, initialState } from '../reducer'
import {
    setError,
    setHasMore,
    setIsLoading,
    setPokemons,
    setOffset
} from '../actions'

describe('reducer', () => {
    let state
    const pokemons = [
        {
            name:"kabutops",
            url:"https://pokeapi.co/api/v2/pokemon/141/"
        },
        {
            name:"aerodactyl",
            url:"https://pokeapi.co/api/v2/pokemon/142/"
        }
    ]

    beforeEach(() => {
        state = {
            error: true,
            hasMore: true,
            isLoading: true,
            pokemons,
            offset: 30
        }
    })

    it('should return valid initial state', () => {
        expect(reducer()).toStrictEqual(initialState)
        expect(reducer(undefined, {})).toBeDefined();
    })

    it('should always return a new state', () => {
        expect(reducer(initialState)).not.toBe(initialState)
    })

    it('should return a state equal to previous when no action is passed', () => {
        expect(reducer(initialState)).toEqual(initialState)
        expect(reducer(state, {})).toEqual(state)
    })

    it('should handle the setError action correctly', () => {
        const expectedResult1 = {
            ...state,
            error: true
        }
        const expectedResult2 = {
            ...state,
            error: false
        }

        expect(reducer(state, setError(true))).toEqual(expectedResult1)
        expect(reducer(state, setError(false))).toEqual(expectedResult2)
    })

    it('should handle the setHasMore action correctly', () => {
        const expectedResult1 = {
            ...state,
            hasMore: true
        }
        const expectedResult2 = {
            ...state,
            hasMore: false
        }

        expect(reducer(state, setHasMore(true))).toEqual(expectedResult1)
        expect(reducer(state, setHasMore(false))).toEqual(expectedResult2)
    })

    it('should handle the setIsLoading action correctly', () => {
        const expectedResult1 = {
            ...state,
            isLoading: true
        }
        const expectedResult2 = {
            ...state,
            isLoading: false
        }

        expect(reducer(state, setIsLoading(true))).toEqual(expectedResult1)
        expect(reducer(state, setIsLoading(false))).toEqual(expectedResult2)
    })

    it('should handle the setPokemons action correctly', () => {
        const pokemons1 = [
            {
                name:"snorlax",
                url:"https://pokeapi.co/api/v2/pokemon/143/"
            },
            {
                name:"articuno",
                url:"https://pokeapi.co/api/v2/pokemon/144/"
            }
        ]
        const expectedResult = {
            ...state,
            pokemons: pokemons1
        }

        expect(reducer(state, setPokemons(pokemons1))).toEqual(expectedResult)
    })

    it('should handle the setOffset action correctly', () => {
        const offset1 = 45
        const offset2 = 943

        const expectedResult1 = {
            ...state,
            offset: offset1
        }
        const expectedResult2 = {
            ...state,
            offset: offset2
        }

        expect(reducer(state, setOffset(offset1))).toEqual(expectedResult1)
        expect(reducer(state, setOffset(offset2))).toEqual(expectedResult2)
    })
})