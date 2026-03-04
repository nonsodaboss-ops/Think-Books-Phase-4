const express = require("express");
const axios = require("axios");
const router = express.Router();
const Book = require("../../models/Book");

// GET all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(
      books.map((book) => ({
        id: book._id,
        title: book.title,
        author: book.author,
      })),
    );
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// GET book details
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    const averageRating = book.ratings.length
      ? (book.ratings.reduce((a, b) => a + b, 0) / book.ratings.length).toFixed(
          1,
        )
      : 0;
    res.json({
      id: book._id,
      title: book.title,
      author: book.author,
      description: book.description,
      averageRating,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book details" });
  }
});

// POST rating
router.post("/:id/rate", async (req, res) => {
  try {
    const { rating } = req.body;
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    book.ratings.push(Number(rating));
    await book.save();
    res.json({ message: "Rating submitted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to submit rating" });
  }
});

// Search books
router.get("/search", async (req, res) => {
  const { title, author, genre } = req.query;
  let query = "";

  if (title) query += `intitle:${title}+`;
  if (author) query += `inauthor:${author}+`;
  if (genre) query += `subject:${genre}`;

  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10`,
    );

    // Build HTML dynamically
    let html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Search Results</title>
      </head>
      <body>
        <h2>Search Results</h2>
        <ul>
    `;

    if (response.data.items) {
      response.data.items.forEach((book) => {
        const info = book.volumeInfo;
        html += `
          <li>
            <strong>${info.title || "No Title"}</strong><br>
            Author(s): ${info.authors ? info.authors.join(", ") : "Unknown"}<br>
            Genre: ${info.categories ? info.categories.join(", ") : "N/A"}<br>
            <a href="${info.infoLink}" target="_blank">More Info</a>
          </li>
        `;
      });
    } else {
      html += `<li>No results found.</li>`;
    }

    html += `
        </ul>
      </body>
      </html>
    `;

    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching books");
  }
});

module.exports = router;
