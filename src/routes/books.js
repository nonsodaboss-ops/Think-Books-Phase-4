const express = require('express');
const axios = require('axios');
const router = express.Router();

// Search books
router.get('/search', async (req, res) => {
  const { title, author, genre } = req.query;
  let query = '';

  if (title) query += `intitle:${title}+`;
  if (author) query += `inauthor:${author}+`;
  if (genre) query += `subject:${genre}`;

  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10`
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
      response.data.items.forEach(book => {
        const info = book.volumeInfo;
        html += `
          <li>
            <strong>${info.title || 'No Title'}</strong><br>
            Author(s): ${info.authors ? info.authors.join(', ') : 'Unknown'}<br>
            Genre: ${info.categories ? info.categories.join(', ') : 'N/A'}<br>
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
    res.status(500).send('Error fetching books');
  }
});

module.exports = router;
