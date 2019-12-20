import React from 'react'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Backdrop from '@material-ui/core/Backdrop'
import styled, { keyframes } from 'styled-components'
import { merge, rubberBand, fadeInUp } from 'react-animations';
import './preloader.css'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
    grid: {
        height: window.innerHeight,
        position: 'fixed',
        top: 0,
        zIndex: 1300,
    }
}))

const PokeLoaderTemplate = ({ children }) => {
    const classes = useStyles()

    return(
        <Grid
            className={classes.grid}
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Grid item>
                {children}
            </Grid>
        </Grid>
    )
}

const rubberBandFadeInUp = merge(rubberBand, fadeInUp)
const PokeLogoAnimation = styled.div`animation: 2s ${keyframes`${rubberBandFadeInUp}`}`

const PokePreloader = () =>
    <PokeLoaderTemplate>
        <PokeLogoAnimation>
            <img
                src="/pokemon_logo.ico"
                alt="loader"
                width="60%"
            />
        </PokeLogoAnimation>
    </PokeLoaderTemplate>

const PokeLoader = () =>
    <PokeLoaderTemplate >
        <CircularProgress />
    </PokeLoaderTemplate>

const PokeWaitingBackdrop = () =>
    <Backdrop open={true}>
        <CircularProgress />
    </Backdrop>

export { PokePreloader, PokeLoader, PokeWaitingBackdrop }