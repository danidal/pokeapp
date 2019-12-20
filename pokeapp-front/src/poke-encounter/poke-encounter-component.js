import React, { useState, useEffect, memo } from 'react'
import PropTypes from 'prop-types'
import Backdrop from '@material-ui/core/Backdrop'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import styled, { keyframes } from 'styled-components'
import { flash, fadeInDownBig } from 'react-animations'
import { makeStyles } from '@material-ui/styles'

import { random } from '../utils/random'
import { wait } from '../utils/wait'
import { PokeEncounterMessage } from './poke-encounter-message-component'
import { 
    CATCHED,
    ESCAPED,
    RUN,
} from './constants'

const useStyles = makeStyles({
    Backdrop: {
        backgroundColor: '#e4daa3',
    },
    GridItem: {
        margin: 0
    }
})

const PokeEncounterContent = ({ name, onClose, onCatch }) => {
    const gridItemClass = useStyles().GridItem
    const [ actionDone, setActionDone ] = useState(false)
    const [ result, setResult ] = useState(undefined)
    const PokeEncounterContentAnimation = styled.div`animation: 1s ${keyframes`${fadeInDownBig}`}`

    const handleCatch = () => {
        setActionDone(true)
        if(random(100) > 50) {
            setResult(CATCHED)
            wait(4000).then(() => {onClose(); onCatch()})
        } else {
            setResult(ESCAPED)
            wait(4000).then(() => onClose())
        }
    }

    const handleRun = () => {
        setActionDone(true)
        setResult(RUN)
        wait(4000).then(() => onClose())
    }

    const content =
        <>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Grid item className={gridItemClass}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item className={gridItemClass}>
                            <img
                                src="/logo192.png"
                                alt="pokemon"
                                height={100}
                            />
                        </Grid>
                        <Grid item className={gridItemClass}>
                            <Box>
                                <img
                                    src="/ash.png"
                                    alt="ash"
                                    height={80}
                                />
                                <Box m={3} />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item className={gridItemClass}>
                    <PokeEncounterMessage
                        name={name}
                        result={result}
                    />
                </Grid>
                <Grid item className={gridItemClass}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item className={gridItemClass}>
                            <Box m={2}>
                                <Button 
                                    variant="contained"
                                    onClick={handleCatch}
                                    disabled={actionDone}
                                    >
                                    <Box width={60}>
                                        Catch
                                    </Box>
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item className={gridItemClass}>
                            <Box m={2}>
                                <Button
                                    variant="contained"
                                    onClick={handleRun}
                                    disabled={actionDone}
                                >
                                    <Box width={60}>
                                        Run
                                    </Box>
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>

    return (
        actionDone
            ?   <>
                    {content}
                </>
            :   <PokeEncounterContentAnimation>
                    {content}
                </PokeEncounterContentAnimation>
    )
}

const PokeEncounter = ({ name, handleClose, handleCatch }) => {
    const backdropClass = useStyles().Backdrop
    const PokeEncounterContainerAnimation = styled.div`animation: .5s ${keyframes`${flash}`} 3`
    const [ isTimeForContent, setIsTimeForContent ] = useState(false)

    useEffect(() => {
        let shouldRun = true
        wait(1500).then(() => {
            if (shouldRun) {
                setIsTimeForContent(true)
            }
        })
        
        return () => {
            shouldRun = false
        }
    })

    return(
        isTimeForContent
            ?   <Backdrop open={true} className={backdropClass}>
                    <PokeEncounterContent
                        name={name}
                        onClose={handleClose}
                        onCatch={handleCatch}
                    />
                </Backdrop>
            :   <PokeEncounterContainerAnimation>
                    <Backdrop open={true} className={backdropClass} />
                </PokeEncounterContainerAnimation>
    )
}

PokeEncounter.propTypes = {
    name: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleCatch: PropTypes.func.isRequired
}

const MemoPokeEncounter = memo(PokeEncounter)
export { MemoPokeEncounter }