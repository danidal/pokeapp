import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import './preloader.css'
import { PokeLoadingBar } from '../poke-loading-bar/poke-loading-bar-component'

const PokePreloader = ({ waitingTime }) => {
    const gridStyle = {height: window.innerHeight}

    return(
        <Grid
            style={gridStyle}
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Grid item>
                <img
                    id="f1"
                    src="/bwicon2.ico"
                    alt="loader"
                />
                <img
                    id="f2"
                    src="/favicon.ico"
                    alt="loader"
                />
                <PokeLoadingBar />
            </Grid>
        </Grid>
    )
}

PokePreloader.propTypes = {
    waitingTime: PropTypes.number.isRequired
}

export { PokePreloader }