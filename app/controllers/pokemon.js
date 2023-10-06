const deleteImage = require("../helpers/deleteImage");
const padWithZeros = require("../helpers/padWithZeros");
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

exports.findMaxId = async (req, res) => {
  const maxId = await getMaxId()

  if (maxId) {
    res.status(200).json(maxId)
  } else {
    res.status(404).json("No record found")
  }
}

exports.create = async (req, res) => {

  if (!req.body.selectedTypeOne) {
    res.status(400).send({ message: "Please add alteast one type of this pokemon" });
    return;
  }

  if (!req.body.englishName) {
    res.status(400).send({ message: "Please add english name for this pokemon" });
    return;
  }

  if (!req.body.hp) {
    res.status(400).send({ message: "Please add HP" });
    return;
  }

  if (!req.body.defense) {
    res.status(400).send({ message: "Please add Defense" });
    return;
  }

  if (!req.body.attack) {
    res.status(400).send({ message: "Please add Attack" });
    return;
  }

  if (!req.body.spAttack) {
    res.status(400).send({ message: "Please add Sp Attack" });
    return;
  }

  if (!req.body.spDefense) {
    res.status(400).send({ message: "Please add Sp Defense" });
    return;
  }

  if (!req.body.speed) {
    res.status(400).send({ message: "Please add Speed" });
    return;
  }

  const maxId = await getMaxId()

  const selectedTypeOne = req.body.selectedTypeOne;
  const selectedTypeTwo = req.body.selectedTypeTwo;

  const type = [selectedTypeOne];

  if (selectedTypeTwo) {
    type.push(selectedTypeTwo);
  }

  const pokemon = new Pokemon({
    id: maxId + 1,
    name: {
      english: req.body.englishName,
      japanese: req.body?.japaneseName ?? null,
      chinese: req.body?.chineseName ?? null,
      french: req.body?.frenchName ?? null,
    },
    type: type,
    base: {
      HP: req.body.hp,
      Attack: req.body.attack,
      Defense: req.body.defense,
      SpAttack: req.body.spAttack,
      SpDefense: req.body.spDefense,
      Speed: req.body.speed,
    }
  });


  try {
    await pokemon.save()
    res.status(200).json(pokemon)
  } catch (error) {
    console.log("error", error)
    res.status(500).json("Error occurred during the saving process")
  }
};

exports.delete = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const pokemon = await Pokemon.findOneAndRemove({ id: id });

    if (pokemon) {
      res.status(200).json(pokemon);
      const filename = `${padWithZeros(id, 3)}.png`
      deleteImage(filename)

    } else {
      res.status(404).json(`Cannot delete Pokemon with id=${id}`);
    }
  } catch (error) {
    console.log(error);
  }
};


async function getMaxId() {
  try {
    const pokemonId = await Pokemon.findOne({}, { _id: 0, id: 1 }, { sort: { id: -1 } });

    if (!pokemonId) {
      return null
    }

    return pokemonId.id
  } catch (error) {
    console.log(error);
  }
}
