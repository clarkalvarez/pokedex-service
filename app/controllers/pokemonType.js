const db = require("../models");
const PokemonType = db.PokemonType;

exports.findAll = async (req, res) => {

  try {
    const pokemonTypes = await PokemonType.find({})
    res.status(200).json(pokemonTypes)
  } catch (error) {
    console.log(error)
  }
};

