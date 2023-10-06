module.exports = app => {
  const pokemon = require("../controllers/pokemon.js");

  var router = require("express").Router();

  router.get("/", pokemon.findAll);

  router.get("/maxId", pokemon.findMaxId);

  router.get("/:id", pokemon.findOne);

  router.post("/", pokemon.create);

  router.put("/:id", pokemon.update);

  router.delete("/:id", pokemon.delete);

  app.use('/api/pokemon', router);
};