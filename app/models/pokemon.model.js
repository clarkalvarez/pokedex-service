module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      id: Number,
      name: {
        english: String,
        japanese: String,
        chinese: String,
        french: String,
      },
      type: [String],
      base: {
        HP: Number,
        Attack: Number,
        Defense: Number,
        "Sp. Attack": Number,
        "Sp. Defense": Number,
        Speed: Number,
      }
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, ...object } = this.toObject();
    return object;
  });

  const Pokemon = mongoose.model("pokemon", schema);
  return Pokemon;
};