const Book = require("../models/Book");
const Rating = require("../models/Rating");

exports.rateBook = async (req, res) => {
  const { rating } = req.body;
  const bookId = req.params.id;

  await Rating.create({ bookId, userId: req.user.id, rating });

  const ratings = await Rating.find({ bookId });
  const avg = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;

  await Book.findByIdAndUpdate(bookId, { averageRating: avg });

  res.json({ success: true, averageRating: avg });
};
