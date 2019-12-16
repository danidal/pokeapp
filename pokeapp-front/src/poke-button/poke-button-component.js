import React from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

const PokeButton = ({ pokemonName, onClick, disabled = false }) => (
    <Box display="inline">
        <Button
            variant="outlined"
            onClick={onClick}
            disabled={disabled}
        >
            {pokemonName}
        </Button>
    </Box>
)

PokeButton.propTypes = {
    pokemonName: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool
}

export { PokeButton }