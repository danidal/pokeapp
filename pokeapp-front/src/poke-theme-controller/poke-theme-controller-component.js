import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/styles'
import Brightness2Icon from '@material-ui/icons/Brightness2'
import Brightness7Icon from '@material-ui/icons/Brightness7'

const useStyles = makeStyles({
    iconButton: {
        position: 'fixed',
        left: 0
    }
})

const PokeThemeController = ({ onClick, dark }) => {
    const classes = useStyles()
    const Icon = dark ? Brightness7Icon : Brightness2Icon

    return(
        <IconButton
            className={classes.iconButton}
            onClick={onClick}
        >
            <Icon />
        </IconButton>
    )
}

PokeThemeController.propTypes = {
    onClick: PropTypes.func.isRequired,
    dark: PropTypes.bool.isRequired
}

export { PokeThemeController }