const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const PORT = 5000;
const SECRET_KEY = "abcdef";

const app = express();

// Middleware must be on TOP
app.use(cors());
app.use(express.json()); 

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/NodeJs_CRUD")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String
});
const User = mongoose.model("User", userSchema);

// Note Schema & Model
const noteSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '', trim: true },
}, { timestamps: true });

const Note = mongoose.model('Note', noteSchema);

// Root API
app.get('/', (req, res) => res.send("Notes API Running!"));

// Get All Notes
app.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// Create Note
app.post('/notes', async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title.trim()) return res.status(400).json({ error: "Title required" });

    const note = new Note({ title, description });
    const savedNote = await note.save();

    res.status(201).json(savedNote);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// Update Note
app.put('/notes/:id', async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title.trim()) return res.status(400).json({ error: "Title required" });

    const updated = await Note.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Note not found" });
    res.json(updated);

  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete Note
app.delete('/notes/:id', async (req, res) => {
  try {
    const deleted = await Note.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ error: "Note not found" });

    res.json({ message: "Note deleted", id: deleted._id });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// Register
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const exists = await User.findOne({ username });
    if (exists) return res.status(409).json({ message: "User exists" });

    const hashed = await bcrypt.hash(password, 10);
    await User({ username, password: hashed }).save();

    res.status(201).json({ message: "Registered!" });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });

  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// Socket Server
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: 'http://localhost:5173', credentials: true }
});

server.listen(PORT, () =>
  console.log(`Server working on http://localhost:${PORT}`)
);
