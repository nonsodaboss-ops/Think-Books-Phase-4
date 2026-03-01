import express from "express";
import connectDB from "./database.js";
import Recommendation from "./models/recommendation.js";

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Example route to test saving a book recommendation
app.post("/recommendations", async (req, res) => {
  try {
    const rec = new Recommendation(req.body);
    await rec.save();
    res.status(201).send(rec);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
