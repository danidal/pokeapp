import React from 'react'
import { render } from '@testing-library/react'
import { PokeButton } from './poke-button-component'

describe('PokeButton', () => {
    const createPokeButton = pokemonName => {
        const onClick = () => console.log('clicked')
        return render(
            <PokeButton pokemonName={pokemonName} onClick={onClick}/>
        )
    }

    it('should render the correct button label', () => {
        const { container } = createPokeButton('Pippo')
        expect(container.querySelector('.MuiButton-label').innerHTML).toBe('Pippo')
    })

    it('should render the correct button label', () => {
        const { container } = createPokeButton('Pluto')
        expect(container.querySelector('.MuiButton-label').innerHTML).toBe('Pluto')
    })
})