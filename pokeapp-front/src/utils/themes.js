import { createMuiTheme } from '@material-ui/core/styles'

const themeParams = {
    overrides: {
        MuiPaper: {
            root: {
                backgroundColor: 'gold'
            }
        },
        MuiGrid: {
            item: {
                margin: '40px 0'
            }
        },
        MuiBackdrop: {
            root: {
                zIndex: 2
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