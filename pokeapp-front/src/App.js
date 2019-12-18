import React, { useState, useEffect, useLayoutEffect } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'

import './App.css'
import Pokemons from './Pokemons'
import { PokePreloader } from './poke-preloader/poke-preloader-component'
import { wait } from './utils/wait'
import { lightTheme, darkTheme } from './utils/themes'

const useStyles = makeStyles({
  App: {
    textAlign: 'center',
  }
})

const AppContent = ({ handleThemeToggle, dark }) => {
  const classes = useStyles()
  const waitingTime = 2300
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    let shouldRun = true
    wait(waitingTime).then(() => {
        if (shouldRun) setLoading(false)
    })
    
    return () => {
        shouldRun = false
    }
  }, [])

  return(
    <Box className={classes.App}>
      {
        loading
          ? <PokePreloader />
          : <Pokemons
              handleThemeToggle={handleThemeToggle}
              dark={dark}
            />
      }
    </Box>
  )
}

const App = () => {
  const getThemeFromLocalStorage = () =>
    window.localStorage.getItem('darkTheme') === 'true'

  const [ isDark, setIsDark ] = useState(getThemeFromLocalStorage())
  
  const theme = isDark ? darkTheme : lightTheme

  useLayoutEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default
  }, [ theme.palette.background.default ])

  const handleThemeToggle = () => {
    window.localStorage.setItem('darkTheme', !isDark)
    setIsDark(!isDark)
  }

  return(
    <ThemeProvider theme={theme}>
      <AppContent 
        handleThemeToggle={handleThemeToggle}
        dark={isDark}
      />
    </ThemeProvider>
  )
}

export default App