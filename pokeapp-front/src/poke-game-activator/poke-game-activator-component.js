import React from 'react'
import PropTypes from 'prop-types'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

const PokeGameActivator = ({
    onChange,
    active
}) =>
        <FormControlLabel
            control={
                <Switch checked={active} onChange={onChange} value="Play" />
            }
            label="Play"
        />

PokeGameActivator.propTypes = {
    onChange: PropTypes.func,
    active: PropTypes.bool,
}

export { PokeGameActivator }