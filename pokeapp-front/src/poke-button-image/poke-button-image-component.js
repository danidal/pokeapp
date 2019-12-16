import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'

import { PokeButton } from '../poke-button/poke-button-component'
import { PokeImage } from '../poke-image/poke-image-component'
import { PokeBall } from '../poke-ball/poke-ball-component'

const useStyles = makeStyles({
    imageGridItem: {
        margin: '0'
    }
})

const PokeButtonImage = ({ pokemonName, catched }) => {
    const classes = useStyles()
    const [buttonClicked, setClicked] = useState(false)
    const handleClick = () => setClicked(true)

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Grid item>
                <PokeBall
                    pokemonName={pokemonName}
                    captured={catched}
                ></PokeBall>
            </Grid>
            <Grid item>
                <PokeButton
                    pokemonName={pokemonName}
                    onClick={handleClick}
                    disabled={buttonClicked}
                ></PokeButton>
            </Grid>
            <Grid item className={classes.imageGridItem}>
                <PokeImage
                    visible={buttonClicked}
                    pokemonName={pokemonName}
                ></PokeImage>
            </Grid>
        </Grid>
    )
}   

PokeButtonImage.propTypes = {
    pokemonName: PropTypes.string.isRequired,
    catched: PropTypes.bool.isRequired
}

export { PokeButtonImage }