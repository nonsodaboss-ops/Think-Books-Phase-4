const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Book = require("./models/Book");

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  // Clear existing books
  await Book.deleteMany({});

  // Insert sample books
  const books = [
    {
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt & David Thomas",
      description: "A classic book on software craftsmanship.",
      ratings: [5, 4, 5],
    },
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      description: "Guidelines for writing clean, maintainable code.",
      ratings: [5, 5, 4, 3],
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      description: "A book about building good habits and breaking bad ones.",
      ratings: [4, 5],
    },
  ];

  await Book.insertMany(books);
  console.log("Database seeded with sample books!");
  mongoose.disconnect();
}

seed();
