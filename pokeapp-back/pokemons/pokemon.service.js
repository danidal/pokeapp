const db = require('../_helpers/db')
const Pokemon = db.Pokemon
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const getPokemon = async name =>
    await Pokemon.find({ name })

const getAll = async () =>
    await Pokemon.find()

/* const addPokemon = async name =>
    new Pokemon({ name }).save() */

const deletePokemon = async name =>
    await Pokemon.deleteOne({ name })

const addPokemon = async name =>
    await Pokemon.findOneAndUpdate(
        { name },
        { $inc: { quantity: 1 } },
        {
            new: true,
            upsert: true
        }
    )

module.exports = {
    getPokemon,
    getAll,
    addPokemon,
    deletePokemon
}