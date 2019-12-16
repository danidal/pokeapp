import { setError, setHasMore, setIsLoading, setPokemons, setOffset } from '../actions'
import { 
    SET_ERROR,
    SET_HAS_MORE,
    SET_IS_LOADING,
    SET_POKEMONS,
    SET_OFFSET
} from '../constants'

describe('setError action', () => {
    it('should return a action object with "type" key', () => {
        expect(setError()).toHaveProperty('type')
    })

    it(`should return a action object with type ${SET_ERROR}`, () => {
        expect(setError().type).toBe(SET_ERROR)
    })

    it('should return a action object with "error" key', () => {
        expect(setError()).toHaveProperty('error')
    })

    it('should return a action object with the input error', () => {
        const isError = true
        expect(setError(isError).error).toBe(isError)
    })

    it('should return a action object with the input error', () => {
        const isError = false
        expect(setError(isError).error).toBe(isError)
    })
})

describe('setHasMore action', () => {
    it('should return a action object with "type" key', () => {
        expect(setHasMore()).toHaveProperty('type')
    })

    it(`should return a action object with type ${SET_HAS_MORE}`, () => {
        expect(setHasMore().type).toBe(SET_HAS_MORE)
    })

    it('should return a action object with "hasMore" key', () => {
        expect(setHasMore()).toHaveProperty('hasMore')
    })

    it('should return a action object with the input hasMore', () => {
        const isHasMore = true
        expect(setHasMore(isHasMore).hasMore).toBe(isHasMore)
    })

    it('should return a action object with the input hasMore', () => {
        const isHasMore = false
        expect(setHasMore(isHasMore).hasMore).toBe(isHasMore)
    })
})

describe('setIsLoading action', () => {
    it('should return a action object with "type" key', () => {
        expect(setIsLoading()).toHaveProperty('type')
    })

    it(`should return a action object with type ${SET_IS_LOADING}`, () => {
        expect(setIsLoading().type).toBe(SET_IS_LOADING)
    })

    it('should return a action object with "isLoading" key', () => {
        expect(setIsLoading()).toHaveProperty('isLoading')
    })

    it('should return a action object with the input isLoading', () => {
        const isLoading = true
        expect(setIsLoading(isLoading).isLoading).toBe(isLoading)
    })

    it('should return a action object with the input isLoading', () => {
        const isLoading = false
        expect(setIsLoading(isLoading).isLoading).toBe(isLoading)
    })
})

describe('setPokemons action', () => {
    const pokemons1 = [
        {
            name:"kabutops",
            url:"https://pokeapi.co/api/v2/pokemon/141/"
        },
        {
            name:"aerodactyl",
            url:"https://pokeapi.co/api/v2/pokemon/142/"
        }
    ]

    const pokemons2 = [
        {
            name:"snorlax",
            url:"https://pokeapi.co/api/v2/pokemon/143/"
        },
        {
            name:"articuno",
            url:"https://pokeapi.co/api/v2/pokemon/144/"
        }
    ]

    it('should return a action object with "type" key', () => {
        expect(setPokemons()).toHaveProperty('type')
    })

    it(`should return a action object with type ${SET_POKEMONS}`, () => {
        expect(setPokemons().type).toBe(SET_POKEMONS)
    })

    it('should return a action object with "pokemons" key', () => {
        expect(setPokemons()).toHaveProperty('pokemons')
    })

    it('should return a action object with the input pokemons', () => {
        expect(setPokemons(pokemons1).pokemons).toBe(pokemons1)
    })

    it('should return a action object with the input pokemons', () => {
        expect(setPokemons(pokemons2).pokemons).toBe(pokemons2)
    })

    it('should have pokemons parameter as array format in returned action', () => {
        expect(setPokemons(pokemons1).pokemons).toBeInstanceOf(Array)
    })
})

describe('setOffset action', () => {
    it('should return a action object with "type" key', () => {
        expect(setOffset()).toHaveProperty('type')
    })

    it(`should return a action object with type ${SET_OFFSET}`, () => {
        expect(setOffset().type).toBe(SET_OFFSET)
    })

    it('should return a action object with "offset" key', () => {
        expect(setOffset()).toHaveProperty('offset')
    })

    it('should return a action object with the input offset', () => {
        const offset = 55
        expect(setOffset(offset).offset).toBe(offset)
    })

    it('should return a action object with the input offset', () => {
        const offset = 1900
        expect(setOffset(offset).offset).toBe(offset)
    })
})