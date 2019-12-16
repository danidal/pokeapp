import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'

import { PokeCard } from '../poke-card/poke-card-component'
import { capitalize } from '../utils/capitalize'
import { useFetch } from '../utils/hooks'

const useStyles = makeStyles({
    root: {
        minWidth: 240,
        minHeight: 300,
    }
})

const PokeModalContent = ({ pokemonName }) => {
    const classes = useStyles();
    const [data, loading, error] = useFetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    
    return (
        <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.root}>
            <Grid item xs={10}>
                {error
                    ?   
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                            align="center"
                            >
                            Error!
                        </Typography>
                    :
                        loading 
                            ?
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="h2"
                                    align="center"
                                >
                                    Loading...
                                </Typography>
                            :
                                <PokeCard
                                    pokemonName={capitalize(pokemonName)}
                                    imageUrl={data.sprites.front_default}
                                />
                }
            </Grid>
        </Grid>
    )
}

PokeModalContent.propTypes = {
    pokemonName: PropTypes.string.isRequired
}

export { PokeModalContent } 