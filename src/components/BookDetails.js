import React, { useState } from "react";

function BookDetails({ book }) {
  const [rating, setRating] = useState(0);

  const submitRating = async () => {
    await fetch(`/api/books/${book.id}/rate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating }),
    });
    // Refresh book details here
  };

  return (
    <div>
      <h2>{book.title}</h2>
      <p>{book.author}</p>
      <p>{book.description}</p>
      <p>Average Rating: {book.averageRating}</p>
      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <button onClick={submitRating}>Submit Rating</button>
    </div>
  );
}

export default BookDetails;
