const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  ratings: [Number],
});

bookSchema.virtual("averageRating").get(function () {
  if (this.ratings.length === 0) return 0;
  return (this.ratings.reduce((a, b) => a + b, 0) / this.ratings.length).toFixed(1);
});

module.exports = mongoose.model("Book", bookSchema);
