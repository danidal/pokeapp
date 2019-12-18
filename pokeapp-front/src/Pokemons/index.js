import React, { useReducer, useEffect, useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import request from 'superagent'
import { debounce } from 'lodash'
import { Offline, Online } from 'react-detect-offline'
import Box from '@material-ui/core/Box'

import  { reducer, initialState } from './reducer'
import {
    setError,
    setHasMore,
    setIsLoading,
    setPokemons,
    setOffset,
    setCatched
} from './actions'
import PokeSnackbar from '../poke-snackbar/poke-snackbar-component'
import { PokeButtonImage } from '../poke-button-image/poke-button-image-component'
import { PokeOfflineMessage } from '../poke-error-message/poke-offline-message-component'
import { /* PokeLoader, */ PokeBackdrop } from '../poke-preloader/poke-preloader-component'
import { PokeNetworkRefresher } from '../poke-network-refresher/poke-network-refresher-component'
import { PokeThemeController } from '../poke-theme-controller/poke-theme-controller-component'

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

const Pokemons = ({ handleThemeToggle, dark }) => {
    const loadingGroupDimension = 15
    const [{
        /* error, */
        hasMore,
        isLoading,
        pokemons,
        offset
    }, dispatch] = useReducer(reducer, initialState)
    const [ isErrorShown, setIsErrorShown ] = useState(false)

    window.onscroll = debounce(() => {
        if (isLoading || !hasMore) return

        if (
            window.innerHeight + document.documentElement.scrollTop
            === document.documentElement.offsetHeight
        ) {
            loadPokemons(offset, loadingGroupDimension, pokemons)
        }
    }, 100)

    const loadPokemons = async (offset, loadingGroupDimension, pokemons) => {
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
            dispatch(setError(false))
            dispatch(setIsLoading(false))
            setIsErrorShown(false)
        } catch(error) {
            dispatch(setError(error.message))
            dispatch(setIsLoading(false))
            setIsErrorShown(true)
        }
    }

    const catchOrLoseFactory = (name, catched) =>
        async () => {
            try {
                const newCatched = !catched
                if(newCatched) {
                    await request.post(`http://localhost:4000/pokemons/${name}`)
                } else {
                    await request.delete(`http://localhost:4000/pokemons/${name}`)
                }
                dispatch(setCatched(name, newCatched))
            } catch(error) {
                console.log(error)
            }
    }

    useEffect(() => {
        loadPokemons(offset, loadingGroupDimension, pokemons)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const pokemonList = pokemons.map(({ name, catched }) => {
        const catchOrLose = catchOrLoseFactory(name, catched)

        return(
            <Fragment key={name}>
                <PokeButtonImage
                    pokemonName={name}
                    catched={catched}
                    onCatch={catchOrLose}
                />
            </Fragment>
        )
    })

    return (
        <Box>
            <Online>
                <PokeNetworkRefresher />
            </Online>

            <Offline>
                <PokeSnackbar
                    message={<PokeOfflineMessage />}
                    variant="info"
                />
            </Offline>

            <PokeThemeController 
                onClick={handleThemeToggle}
                dark={dark}
            />

            {pokemonList}

            {isLoading &&
                /* <PokeLoader /> */
                <PokeBackdrop />
            }
            {!hasMore &&
                <Box m={2}>You reached the end!</Box>
            }

            <PokeSnackbar
                message="Error on loading data :|"
                variant="error"
                duration={3000}
                vertical="bottom"
                forcedExternalOpen={isErrorShown}
                extraHandleClose={() => setIsErrorShown(false)}
            />
        </Box>
    )
}

Pokemons.propTypes = {
    handleThemeToggle: PropTypes.func.isRequired,
    dark: PropTypes.bool.isRequired
}

export default Pokemons
