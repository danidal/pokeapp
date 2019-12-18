import React from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'

import { PokeIconTimer } from '../poke-icon-timer/poke-icon-timer-component'

const useStyles = makeStyles({
    gridItem: {
        margin: 0
    }
})

const PokeErrorMessage = ({ message }) => {
    const classes = useStyles()

    return(
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Grid item className={classes.gridItem}>
                <Box mr={1}>
                    {
                        message.includes("the network is offline")
                            ?   "You're currently offline"
                            :   message
                    }
                </Box>
            </Grid>
            {
                message.includes("the network is offline")
                    ?   <Grid item className={classes.gridItem}>
                            <PokeIconTimer />
                        </Grid>
                    :   <></>
            }
        </Grid>
    )
}

PokeErrorMessage.propTypes = {
    message: PropTypes.string.isRequired
}

export { PokeErrorMessage }