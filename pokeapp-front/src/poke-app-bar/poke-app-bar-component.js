import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'

import { PokeThemeController } from '../poke-theme-controller/poke-theme-controller-component'
import { PokeGameActivator } from '../poke-game-activator/poke-game-activator-component'

const useStyles = makeStyles({
    GridItem: {
        margin: 0
    }
})

const PokeAppBar = ({
    handleThemeToggle,
    dark,
    handleGameActivation,
    active
}) => {
    const classes = useStyles()

    return(
        <>
            <AppBar position="fixed" color="inherit">
                <Toolbar>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <Grid item className={classes.GridItem} >
                            <PokeGameActivator
                                onChange={handleGameActivation}
                                active={active}
                            />
                        </Grid>
                        <Grid item className={classes.GridItem} >
                            <PokeThemeController 
                                onClick={handleThemeToggle}
                                dark={dark}
                            />
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    )
}

PokeThemeController.propTypes = {
    handleThemeToggle: PropTypes.func.isRequired,
    dark: PropTypes.bool.isRequired,
    handleGameActivation: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
}

export { PokeAppBar }