const db = require("../models");
const Pokemon = db.Pokemon;

exports.findAll = async (req, res) => {

  try {
    const pokemons = await Pokemon.find({})
    res.status(200).json(pokemons)
  } catch (error) {
    console.log(error)
  }
};

exports.findOne = async (req, res) => {

  try {
    const id = Number(req.params.id);
    const pokemon = await Pokemon.findOne({ id: id });

    if (pokemon) {
      res.status(200).json(pokemon)
    } else {
      res.status(404).json("Pokemon not found")

    }
  } catch (error) {
    console.log(error)
  }

};

