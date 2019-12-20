import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/styles'
import styled, { keyframes } from 'styled-components'
import { fadeInLeftBig, fadeOutRightBig } from 'react-animations'

import { wait } from '../utils/wait'
import { 
    CATCHED,
    ESCAPED,
    RUN,
} from './constants'

const useStyles = makeStyles({
    success: {
        backgroundColor: 'green'
    },
    failure: {
        backgroundColor: 'red'
    }
})

const PokeResponseAnimation = styled.div`animation: 1s ${keyframes`${fadeInLeftBig}`}`
const PokeOutAnimation = styled.div`animation: 2s ${keyframes`${fadeOutRightBig}`}`

const PokeAppearedMessage = ({ name }) =>
    <Paper>
        <Box p={2}>
            {`Wild ${name.toUpperCase()} appeared!`}
        </Box>
    </Paper>

const PokeFeedBackTemplate = ({ name, children }) => {
    const [ initial, setInitial ] = useState(true)
    useEffect(() => {
        let shouldRun = true
        wait(1000).then(() => {
            if (shouldRun) {
                setInitial(false)
            }
        })
        
        return () => {
            shouldRun = false
        }
    })

    return (
        initial
            ?   <PokeOutAnimation>
                    <PokeAppearedMessage name={name} />
                </PokeOutAnimation>
            :   <>
                    {children}
                </>
    )
}

const PokeRunMessage = ({ name }) =>
    <PokeFeedBackTemplate name={name}>
        <PokeResponseAnimation>
            <Paper>
                <Box p={2}>
                    {`Danger avoided!`}
                </Box>
            </Paper>
        </PokeResponseAnimation>
    </PokeFeedBackTemplate>

const PokeCatchedMessage = ({ name }) => {
    const classes = useStyles()
    return(
        <PokeFeedBackTemplate name={name}>
            <PokeResponseAnimation>
                <Paper className={classes.success}>
                    <Box p={2}>
                        {`${name.toUpperCase()} catched!`}
                    </Box>
                </Paper>
            </PokeResponseAnimation>
        </PokeFeedBackTemplate>
    )
}

const PokeEscapedMessage = ({ name }) => {
    const classes = useStyles()
    return(
        <PokeFeedBackTemplate name={name}>
            <PokeResponseAnimation>
                <Paper className={classes.failure}>
                    <Box p={2}>
                        {`${name.toUpperCase()} escaped!`}
                    </Box>
                </Paper>
            </PokeResponseAnimation>
        </PokeFeedBackTemplate>
    )
}

const PokeEncounterMessage = ({ name, result }) => {
    switch(result) {
        case undefined:
            return <PokeAppearedMessage name={name} />
        case CATCHED:
            return <PokeCatchedMessage name={name} />
        case ESCAPED:
            return <PokeEscapedMessage name={name} />
        case RUN:
            return <PokeRunMessage name={name} />
        default:
            return null
    }
}

PokeEncounterMessage.propTypes = {
    name: PropTypes.string.isRequired,
    result: PropTypes.string
}

export { PokeEncounterMessage }