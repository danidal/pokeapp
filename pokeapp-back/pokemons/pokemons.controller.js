const express = require('express')
const router = express.Router()
const pokemonService = require('./pokemon.service')

// routes
router.get('/:name', getPokemon)
router.get('/', getAll)
router.post('/:name', addPokemon)
router.delete('/:name', deletePokemon)

module.exports = router

function getPokemon(req, res, next) {
    pokemonService.getPokemon(req.params.name)
        .then(pokemon => res.json(pokemon))
        .catch(err => next(err))
}

function getAll(req, res, next) {
    pokemonService.getAll()
        .then(pokemons => res.json(pokemons))
        .catch(err => next(err))
}

function addPokemon(req, res, next) {
    pokemonService.addPokemon(req.params.name)
        .then(pokemon => res.json(pokemon))
        .catch(err => next(err))
}

function deletePokemon(req, res, next) {
    pokemonService.deletePokemon(req.params.name)
        .then(pokemon => res.json(pokemon))
        .catch(err => next(err))
}