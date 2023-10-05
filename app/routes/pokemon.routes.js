module.exports = app => {
  const pokemon = require("../controllers/pokemon.js");

  var router = require("express").Router();

  router.get("/", pokemon.findAll);

  router.get("/:id", pokemon.findOne);

  app.use('/api/pokemon', router);
};