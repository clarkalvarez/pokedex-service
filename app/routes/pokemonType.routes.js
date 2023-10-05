module.exports = app => {
  const pokemonType = require("../controllers/pokemonType.js");

  var router = require("express").Router();

  router.get("/", pokemonType.findAll);

  app.use('/api/pokemonType', router);
};