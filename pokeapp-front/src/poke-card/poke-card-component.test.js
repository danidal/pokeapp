import React from 'react'
import { render } from '@testing-library/react'
import { PokeCard } from './poke-card-component'

describe('PokeCard', () => {
    const createPokeCard = (pokemonName, imageUrl) => {
        const defaultImageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
        return render(
            <PokeCard pokemonName={pokemonName} imageUrl={imageUrl || defaultImageUrl}/>
        )
    }

    it('should render a correct pokemon name', () => {
        const { getByTestId } = createPokeCard('Pippo')
        expect(getByTestId('pokemon-name').innerHTML).toBe('Pippo')
    })

    it('should render a correct pokemon name', () => {
        const { getByTestId } = createPokeCard('Pluto')
        expect(getByTestId('pokemon-name').innerHTML).toBe('Pluto')
    })

    it('should set a correct title for the image', () => {
        const { getByTestId } = createPokeCard('Pippo')
        expect(getByTestId('pokemon-image').getAttribute('title')).toBe('Pippo')
    })

    it('should set a correct title for the image', () => {
        const { getByTestId } = createPokeCard('Pluto')
        expect(getByTestId('pokemon-image').getAttribute('title')).toBe('Pluto')
    })
    
    it('should render the right pokemon image', () => {
        const imageSrc = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'
        const { getByTestId } = createPokeCard('Pluto', imageSrc)
        expect(getByTestId('pokemon-image')).toHaveStyle(`
            background-image: url("${imageSrc}")
        `)
    })

    it('should render the right pokemon image', () => {
        const imageSrc = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png'
        const { getByTestId } = createPokeCard('Pluto', imageSrc)
        expect(getByTestId('pokemon-image')).toHaveStyle(`
            background-image: url("${imageSrc}")
        `)
    })
})  