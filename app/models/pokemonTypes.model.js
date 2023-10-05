module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      english: String,
      japanese: String,
      chinese: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, ...object } = this.toObject();
    return object;
  });

  const PokemonType = mongoose.model("pokemontype", schema);
  return PokemonType;
};