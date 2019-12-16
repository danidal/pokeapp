import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
    cardMedia: {
        backgroundColor: '#ffffffff'
    },
    cardContent: {
        backgroundColor: '#064646'
    },
    typography: {
        color: '#ffffffff'
    }
})

const PokeCard = ({ pokemonName, imageUrl }) => {
    const classes = useStyles()

    return (
        <Card>
            <CardActionArea>
                <CardMedia
                    data-testid="pokemon-image"
                    image={imageUrl}
                    title={pokemonName}
                    alt="pokemon image"
                    component="img"
                    height="140"
                    className={classes.cardMedia}
                />
                <CardContent className={classes.cardContent}>
                    <Typography
                        data-testid="pokemon-name"
                        gutterBottom
                        variant="h5"
                        component="h2"
                        align="center"
                        className={classes.typography}
                    >
                        {pokemonName}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

PokeCard.propTypes = {
    pokemonName: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired
}

export { PokeCard }