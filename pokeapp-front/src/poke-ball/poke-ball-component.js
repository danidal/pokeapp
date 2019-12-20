import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Badge from '@material-ui/core/Badge'

const useStyles = makeStyles({
    image: {
        marginRight: 16,
        cursor: 'pointer'
    }
})

const width = 26
const height = 26

const PokeBall = ({
    quantity
}) => {
    const classes = useStyles()
    const pokeBallSrc = 
        quantity > 0
            ?   "/pokeball.png"
            :   "/bwpokeball.png"

    const imgStyle = { 
        opacity: (quantity > 0) ? 1 : .2,
        zIndex: -2
    }

    const imgElement =
        <img
            className={classes.image}
            src={pokeBallSrc}
            alt="pokeball"
            width={width}
            height={height}
            style={imgStyle}
        />

    return (
        quantity > 1
        ?   <Badge badgeContent={quantity} color="primary"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                {imgElement}
            </Badge>
        :   imgElement
    )
}

PokeBall.propTypes = {
    quantity: PropTypes.number.isRequired
}

export { PokeBall }