const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pokemonSchema = new Schema({
    name: { type: String, required: true },
    quantity: { type: Number }
});

pokemonSchema.set('toJSON');

module.exports = mongoose.model('Pokemon', pokemonSchema)