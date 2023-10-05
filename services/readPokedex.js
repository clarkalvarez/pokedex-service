const fs = require('fs');

function readPokedex() {
    try {
        const data = fs.readFileSync('./pokemonList/pokedex.json', 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading pokedex.json:', error);
        return [];
    }
}


module.exports = readPokedex;