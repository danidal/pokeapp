import React, { useState } from 'react'
import PropTypes from 'prop-types'
import request from 'superagent'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
    rightMargin: {
        marginRight: 36
    }
})

const width = 26
const height = 26

const PokeBall = ({ pokemonName, captured }) => {
    const classes = useStyles()
    const [ catched, setCaptured ] = useState(captured)
    const pokeBallSrc = catched ? "/pokeball.png" : "/bwpokeball.png"
    const imgStyle = { opacity: catched ? 1 : .2 }
    
    const handleClick = async () => {
        try {
            const newCatched = !catched
            if(newCatched) {
                await request.post(`http://localhost:4000/pokemons/${pokemonName}`)
            } else {
                await request.delete(`http://localhost:4000/pokemons/${pokemonName}`)
            }
            setCaptured(newCatched)
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <img
            className={classes.rightMargin}
            src={pokeBallSrc}
            alt="pokeball"
            width={width}
            height={height}
            style={imgStyle}
            onClick={handleClick}
        />
    )
}

PokeBall.propTypes = {
    pokemonName: PropTypes.string.isRequired,
    captured: PropTypes.bool.isRequired
}

export { PokeBall }