const express = require('express');
const app = express();
const port = 3100;  
const cors = require('cors');
const readPokedex = require('./services/readPokedex');
const getNextPokedexId = require('./services/getNextPokedexId');
const writePokedex = require('./services/writePokedex');
const readPokedexTypes = require('./services/readPokedexTypes');

app.use(cors());
app.use(express.json());

// Get All Pokedex
app.get('/pokedex', (req, res) => {
    const pokedex = readPokedex();
    res.json(pokedex);
});

// Get Pokedex by Id
app.get('/pokedex/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokedexList = readPokedex();
    const pokedex = pokedexList.find((t) => t.id === id);

    if (!pokedex) {
        res.status(404).json({ error: 'Pokedex not found' });
    } else {
        res.json(pokedex);
    }
});

// Create Pokedex
app.post('/pokedex', (req, res) => {
    const newPokedex = req.body;
    newPokedex.id = getNextPokedexId(); 
    const pokedex = readPokedex();
    pokedex.push(newPokedex);
    writePokedex(pokedex); 
    res.status(201).json(newPokedex);
});

// Update Pokedex
app.put('/pokedex/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedPokedex = req.body;
    const pokedex = readPokedex();
    const index = pokedex.findIndex((t) => t.id === id);

    if (index === -1) {
        res.status(404).json({ error: 'Pokedex not found' });
    } else {
        pokedex[index] = { ...pokedex[index], ...updatedPokedex };
        writePokedex(pokedex);
        res.json(pokedex[index]);
    }
});

// Delete Pokedex by Id
app.delete('/pokedex/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todos = readPokedex();
    const index = todos.findIndex((t) => t.id === id);

    if (index === -1) {
        res.status(404).json({ error: 'Todo not found' });
    } else {
        const deletedTodo = todos.splice(index, 1);
        writePokedex(todos);
        res.json(deletedTodo[0]);
    }
});


// Get All Pokedex Types
app.get('/pokedexTypes', (req, res) => {
    const pokedexTypes = readPokedexTypes();
    res.json(pokedexTypes);
});

 

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
