import React, { useState } from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import './App.css'
import Pokemons from './Pokemons'
import { PokePreloader } from './poke-preloader/poke-preloader-component'

const theme = createMuiTheme({
  palette: {
    primary: { 
      main: '#4c4c4c'
    }
  },
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
    }
  }
})

const App = () => {
  const waitingTime = 3000
  const [loading, setLoading] = useState(true)
  setTimeout(() => setLoading(false), waitingTime)

  return(
    <ThemeProvider theme={theme}>
      <Box className="App">
        {
          loading
            ? <PokePreloader waitingTime={waitingTime} />
            : <Pokemons />
        }
      </Box>
    </ThemeProvider>
  )
}

export default App