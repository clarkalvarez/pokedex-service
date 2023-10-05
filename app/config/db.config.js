require('dotenv').config();

module.exports = {
  url: `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/pokedex_database?retryWrites=true&w=majority`,
};