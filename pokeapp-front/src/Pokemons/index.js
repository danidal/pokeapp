import React, { useReducer, useEffect, Fragment } from 'react'
import request from 'superagent'
import { debounce } from 'lodash'
import Box from '@material-ui/core/Box'

import  { reducer, initialState } from './reducer'
import { setError, setHasMore, setIsLoading, setPokemons, setOffset } from './actions'
import { PokeButtonImage } from '../poke-button-image/poke-button-image-component'
import { PokeLoadingBar } from '../poke-loading-bar/poke-loading-bar-component'

const Pokemons = () => {
    const loadingGroupDimension = 15
    const [
        { error, hasMore, isLoading, pokemons, offset },
        dispatch
    ] = useReducer(reducer, initialState);

    window.onscroll = debounce(() => {
        if (error || isLoading || !hasMore) return

        if (
            window.innerHeight + document.documentElement.scrollTop
            === document.documentElement.offsetHeight
        ) {
            loadPokemons(offset, loadingGroupDimension)
        }
    }, 100)

    const checkIfPokemonIsCatched = async (pokemon = "") => {
        let isCatched = false
        try {
            const pokemonFromDB = await request.get(`http://localhost:4000/pokemons/${pokemon.name}`)
            if (pokemonFromDB.body.length > 0) isCatched = true
        } catch(error) {
            console.log(error)
        }
        return isCatched
    }

    const addCatchedProp = async (pokemon = "") => {
        const isCatched = await checkIfPokemonIsCatched(pokemon)
        return ({
            name: pokemon.name,
            catched: isCatched
        })
    }

    const loadPokemons = async (offset, loadingGroupDimension) => {
        dispatch(setIsLoading(true))
        try {
            const loadedPokemons = await request
                .get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${loadingGroupDimension}`)
            const nextPokemons = await Promise.all(
                loadedPokemons.body.results.map(pokemon =>
                    addCatchedProp(pokemon)
                )
            )
            const nextOffset = offset + loadingGroupDimension

            dispatch(setHasMore(nextOffset < 150))
            dispatch(setPokemons([
                ...pokemons,
                ...nextPokemons
            ]))
            dispatch(setOffset(nextOffset))
            dispatch(setIsLoading(false))
        } catch(error) {
            dispatch(setError(error.message))
            dispatch(setIsLoading(false))
        }
    }

    useEffect(() => {
        loadPokemons(offset, loadingGroupDimension)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Box>
            {pokemons.map(({ name, catched }) => (
                <Fragment key={name}>
                    <PokeButtonImage
                        pokemonName={name}
                        catched={catched}
                    />
                </Fragment>
            ))}
            
            {error &&
                <Box style={{ color: '#900' }} m={2}>
                    {error}
                </Box>
            }
            {isLoading &&
                <PokeLoadingBar xs={3} lg={1} />
            }
            {!hasMore &&
                <Box m={2}>You reached the end!</Box>
            }
        </Box>
    )
}

export default Pokemons
