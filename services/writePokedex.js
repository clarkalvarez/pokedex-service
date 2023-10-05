const fs = require('fs');

function writePokedex(pokedex) {
    try {
        fs.writeFileSync('./pokemonList/pokedex.json', JSON.stringify(pokedex, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing pokedex.json:', error);
    }
}

module.exports = writePokedex;
