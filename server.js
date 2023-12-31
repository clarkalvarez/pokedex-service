const express = require('express');
const app = express();
const port = 3100;
const cors = require('cors');
const db = require("./app/models");
const bodyParser = require('body-parser')


app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
require("./app/routes/pokemon.routes")(app);
require("./app/routes/pokemonType.routes")(app);
require("./app/routes/images.routes")(app);

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});


db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });
