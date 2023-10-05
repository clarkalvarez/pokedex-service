const fs = require('fs');

function readPokedexTypes() {
    try {
        const data = fs.readFileSync('./pokemonList/types.json', 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading types.json:', error);
        return [];
    }
}

module.exports = readPokedexTypes;
