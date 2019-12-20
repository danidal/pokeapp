import React, { useReducer, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import request from 'superagent'
import { Offline/* , Online */ } from 'react-detect-offline'
import Box from '@material-ui/core/Box'

import { wait } from '../utils/wait'
import { random } from '../utils/random'
import  { reducer, initialState } from './reducer'
import {
    setError,
    setHasMore,
    setIsLoading,
    setPokemons,
    setOffset,
    setCatched,
    setGameActive,
    setEncountered
} from './actions'
import PokeSnackbar from '../poke-snackbar/poke-snackbar-component'
import { PokeOfflineMessage } from '../poke-error-message/poke-offline-message-component'
import { PokeAppBar } from '../poke-app-bar/poke-app-bar-component'
import { MemoPokeEncounter as PokeEncounter } from '../poke-encounter/poke-encounter-component'
import { PokeRest } from '../poke-rest/poke-rest-component'

const getQuantityOfCatchedPokemons = async (pokemon = "") => {
    const pokemonFromDB = await request.get(`http://localhost:4000/pokemons/${pokemon.name}`)
    const { quantity } = pokemonFromDB.body[0] || { quantity: 0 }
    return quantity
}

const addCatchedProp = async (pokemon = "") => {
    const quantity = await getQuantityOfCatchedPokemons(pokemon)
    return ({
        name: pokemon.name,
        quantity
    })
}

const Pokemons = ({ handleThemeToggle, dark }) => {
    const loadingGroupDimension = 15
    const [{
        /* error, */
        hasMore,
        isLoading,
        pokemons,
        offset,
        isGameActive,
        encountered
    }, dispatch] = useReducer(reducer, initialState)
    const [ isErrorShown, setIsErrorShown ] = useState(false)

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

    const catchFactory = name =>
        async () => {
            try {
                await request.post(`http://localhost:4000/pokemons/${name}`)
                /* await request.delete(`http://localhost:4000/pokemons/${name}`) */
                dispatch(setCatched(name))
            } catch(error) {
                console.log(error)
            }
    }

    const handleGameActivation = () => dispatch(setGameActive(!isGameActive))
    const handleEncounterLeave = () => dispatch(setEncountered(""))
    const encounterPokemon = pokemons => {
        const pokemon = pokemons[random(pokemons.length - 1)]
        return pokemon.name
    }
    const timeToWait = () => random(10000, 2000)
    const closeErrorAlert = () => setIsErrorShown(false)

    useEffect(() => {
        loadPokemons(offset, loadingGroupDimension, pokemons)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        let shouldRun = true
        if(isGameActive && !encountered) {
            wait(timeToWait()).then(() => {
                if (shouldRun) {
                    dispatch(setEncountered(encounterPokemon(pokemons)))
                }
            })
        }
        
        return () => {
            shouldRun = false
        }
    })

    const handleCatch = catchFactory(encountered)

    return (
        <Box>
            <Offline>
                <PokeSnackbar
                    message={<PokeOfflineMessage />}
                    variant="info"
                />
            </Offline>

            <PokeAppBar 
                handleThemeToggle={handleThemeToggle}
                dark={dark}
                handleGameActivation={handleGameActivation}
                active={isGameActive}
            />
            
            {encountered
                ?   <PokeEncounter
                        name={encountered}
                        handleClose={handleEncounterLeave}
                        handleCatch={handleCatch}
                    />
                :   <PokeRest
                        isErrorShown={isErrorShown}
                        hasMore={hasMore}
                        isLoading={isLoading}
                        offset={offset}
                        loadingGroupDimension={loadingGroupDimension}
                        pokemons={pokemons}
                        loadPokemons={loadPokemons}
                        closeErrorAlert={closeErrorAlert}
                    />
            }
            
        </Box>
    )
}

Pokemons.propTypes = {
    handleThemeToggle: PropTypes.func.isRequired,
    dark: PropTypes.bool.isRequired
}

export default Pokemons
