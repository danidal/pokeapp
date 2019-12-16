const db = require('../_helpers/db')
const Pokemon = db.Pokemon
require('mongoose')

const getPokemon = async name =>
    await Pokemon.find({ name })

const getAll = async () =>
    await Pokemon.find()

const addPokemon = async name =>
    new Pokemon({ name }).save()

const deletePokemon = async name =>
    await Pokemon.deleteOne({ name })

module.exports = {
    getPokemon,
    getAll,
    addPokemon,
    deletePokemon
}