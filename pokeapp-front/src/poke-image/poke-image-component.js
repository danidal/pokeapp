import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Skeleton from '@material-ui/lab/Skeleton'
import { makeStyles } from '@material-ui/styles'

import { useFetch } from '../utils/hooks'

const useStyles = makeStyles({
    leftMargin: {
        marginLeft: 6
    }
})

const width = 80
const height = 80

const PokeVisibleImage = ({ imageUrl }) => {
    const [hidden, setHidden] = useState(true)
    const classes = useStyles()

    return (
        <>
            <img
                className={classes.leftMargin}
                src={imageUrl}
                alt="pokemon"
                width={width}
                height={height}
                onLoad={() => setHidden(false)}
                hidden={hidden}
            />
            {
                hidden &&
                <Skeleton
                    className={classes.leftMargin}
                    variant="rect"
                    width={width}
                    height={height}
                />
            }
        </>
    )
}

const PokeImage = ({ visible, pokemonName }) => {
    const [ data/* , loading, error */ ] = useFetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

    return(
        visible
            ?   <PokeVisibleImage imageUrl={data.sprites.front_default} />
            :   <></>
    )
}



PokeImage.propTypes = {
    visible: PropTypes.bool.isRequired,
    pokemonName: PropTypes.string.isRequired
}

export { PokeImage }