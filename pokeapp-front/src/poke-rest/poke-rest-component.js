import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { debounce } from 'lodash'
import Box from '@material-ui/core/Box'

import { PokeButtonImage } from '../poke-button-image/poke-button-image-component'
import { PokeWaitingBackdrop } from '../poke-preloader/poke-preloader-component'
import PokeSnackbar from '../poke-snackbar/poke-snackbar-component'

const PokeRest = ({
    isErrorShown,
    hasMore,
    isLoading,
    offset,
    loadingGroupDimension,
    pokemons,
    encountered,
    loadPokemons,
    closeErrorAlert
}) => {
    window.onscroll = debounce(() => {
        if (isLoading || !!encountered || !hasMore) return

        if (
            window.innerHeight + document.documentElement.scrollTop
            === document.documentElement.offsetHeight
        ) {
            loadPokemons(offset, loadingGroupDimension, pokemons)
        }
    }, 100)

    const pokemonList = pokemons.map(({ name, quantity }) =>
        <Fragment key={name}>
            <PokeButtonImage
                pokemonName={name}
                quantity={quantity}
            />
        </Fragment>
    )

    return(
        <>
            {pokemonList}

            {isLoading &&
                <PokeWaitingBackdrop />
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
                extraHandleClose={closeErrorAlert}
            />
        </>
    )
}

PokeRest.propTypes = {
    isErrorShown: PropTypes.bool.isRequired,
    hasMore: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    offset: PropTypes.number.isRequired,
    loadingGroupDimension: PropTypes.number.isRequired,
    pokemons: PropTypes.array.isRequired,
    encountered: PropTypes.string.isRequired,
    loadPokemons: PropTypes.func.isRequired,
    closeErrorAlert: PropTypes.func.isRequired,
}

export { PokeRest }