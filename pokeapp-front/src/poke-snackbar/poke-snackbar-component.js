import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import { amber, green } from '@material-ui/core/colors'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import WarningIcon from '@material-ui/icons/Warning'
import { makeStyles } from '@material-ui/core/styles'

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
}

const useStyles1 = makeStyles(theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    }
}))

const MySnackbarContentWrapper = ({ message, onClose, variant, ...other }) => {
    const classes = useStyles1()
    const Icon = variantIcon[variant]

    return (
        <SnackbarContent
            className={classes[variant]}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={clsx(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
                    <CloseIcon className={classes.icon} />
                </IconButton>
            ]}
            {...other}
        />
    )
}

const CustomizedSnackbar = ({
    message,
    variant,
    duration = null,
    vertical = 'top',
    horizontal = 'center',
    forcedExternalOpen,
    extraHandleClose = () => {}
}) => {
    const [open, setOpen] = useState(true)
    const actualOpen =
        forcedExternalOpen !== undefined
            ?   forcedExternalOpen
            :   open

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
        extraHandleClose()
    }

    return (
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={actualOpen}
            autoHideDuration={duration}
            onClose={handleClose}
        >
            <MySnackbarContentWrapper
                onClose={handleClose}
                variant={variant}
                message={message}
            />
        </Snackbar>
    )
}

CustomizedSnackbar.propTypes = {
    message: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
    duration: PropTypes.number,
    vertical: PropTypes.string,
    horizontal: PropTypes.string,
    forcedExternalOpen: PropTypes.bool,
    extraHandleClose: PropTypes.func
}

export default CustomizedSnackbar