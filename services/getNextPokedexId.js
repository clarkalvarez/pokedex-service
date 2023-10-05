const readPokedex = require("./readPokedex");

 
function getNextPokedexId() {
    const pokedex = readPokedex();
    const maxId = pokedex.reduce((max, pokedex) => (pokedex.id > max ? pokedex.id : max), 0);
    return maxId + 1;
}

module.exports = getNextPokedexId;
