const express = require("express");
const path = require("path");
const session = require("express-session");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./src/routes/auth");
const booksRouter = require("./src/routes/books");

const Recommendation = require("./models/recommendation");

dotenv.config();
// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

const app = express();

// Configure express-session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true if using HTTPS
  }),
);

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Mount books router on /books

// Mount auth router on /auth
app.use("/auth", authRoutes);
app.use("/books", booksRouter);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Middleware to check if user is logged in (simple session-based)
const User = require("./models/User");
app.use((req, res, next) => {
  // For demonstration, assume userId is stored in session (req.session.userId)
  // In production, use proper authentication
  if (req.session && req.session.userId) {
    req.userId = req.session.userId;
  }
  next();
});

// Route to save a book recommendation and associate with user
app.post("/recommendations", async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).send({ error: "User not authenticated" });
    }
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    const rec = new Recommendation({ ...req.body, user: user._id });
    await rec.save();
    res.status(201).send(rec);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Automatically open browser to recommend.html on server start
  if (process.env.NODE_ENV !== "test") {
    const open = require("open");
    (open.default || open)(`http://localhost:${PORT}/recommend.html`);
  }
});
