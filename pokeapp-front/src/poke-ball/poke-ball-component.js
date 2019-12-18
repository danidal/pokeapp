import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
    image: {
        marginRight: 16,
        cursor: 'pointer'
    }
})

const width = 26
const height = 26

const PokeBall = ({
    catched,
    onCatch
}) => {
    const classes = useStyles()
    const pokeBallSrc = catched ? "/pokeball.png" : "/bwpokeball.png"
    const imgStyle = { opacity: catched ? 1 : .2 }
    
    return (
        <img
            className={classes.image}
            src={pokeBallSrc}
            alt="pokeball"
            width={width}
            height={height}
            style={imgStyle}
            onClick={onCatch}
        />
    )
}

PokeBall.propTypes = {
    catched: PropTypes.bool.isRequired,
    onCatch: PropTypes.func.isRequired
}

export { PokeBall }