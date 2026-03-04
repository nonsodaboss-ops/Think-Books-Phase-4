const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: Number,
});

module.exports = mongoose.model("Rating", ratingSchema);
