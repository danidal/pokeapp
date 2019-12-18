import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
/* import { makeStyles } from '@material-ui/styles' */

/* const useStyles = makeStyles({
    linearProgress: {
        height: 1
    }
}) */

const PokeLoadingBar = ({ xs = 12, lg = 12 }) => {
    /* const classes = useStyles() */

    return(
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Grid item xs={xs} lg={lg}>
                <LinearProgress /* className={classes.linearProgress} */ />
            </Grid>
        </Grid>
    )
}

PokeLoadingBar.propTypes = {
    xs: PropTypes.number,
    lg: PropTypes.number
}

export { PokeLoadingBar }