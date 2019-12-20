import { createMuiTheme } from '@material-ui/core/styles'

const themeParams = {
    overrides: {
        MuiGrid: {
            item: {
                margin: '40px 0'
            }
        },
        MuiBackdrop: {
            root: {
                zIndex: 1000
            }
        },
        MuiBadge: {
            colorPrimary: {
                backgroundColor: '#7386ec',
                fontWeight: 'bold'
            },
            badge: {
                zIndex: -1
            }
        }
    }
}

const lightTheme = createMuiTheme({
    ...themeParams,
    palette: {
        type: 'light'
    }
})

const darkTheme = createMuiTheme({
    ...themeParams,
    palette: {
        type: 'dark'
    }
})

export { lightTheme, darkTheme }