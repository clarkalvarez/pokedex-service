const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.Pokemon = require("./pokemon.model.js")(mongoose);
db.PokemonType = require("./pokemonTypes.model.js")(mongoose);

module.exports = db;