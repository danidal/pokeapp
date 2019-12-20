import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Brightness2Icon from '@material-ui/icons/Brightness2'
import Brightness7Icon from '@material-ui/icons/Brightness7'

const PokeThemeController = ({ onClick, dark }) => {
    const Icon = dark ? Brightness7Icon : Brightness2Icon

    return(
        <IconButton
            onClick={onClick}
        >
            <Icon />
        </IconButton>
    )
}

PokeThemeController.propTypes = {
    onClick: PropTypes.func,
    dark: PropTypes.bool
}

export { PokeThemeController }