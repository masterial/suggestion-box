import { Router } from "express";
import { initDB } from "../db";
import { Suggestion, Comment } from "../types";

const router = Router();

// GET /api/suggestions - list all suggestions
router.get("/", async (req, res) => {
  const db = await initDB();
  const suggestions = await db.all<Suggestion[]>("SELECT * FROM suggestions ORDER BY id DESC");
  res.json(suggestions);
});

// GET /api/suggestions/:id - get single suggestion & its comments
router.get("/:id", async (req, res) => {
  const db = await initDB();
  const { id } = req.params;
  
  const suggestion = await db.get<Suggestion>(
    "SELECT * FROM suggestions WHERE id = ?",
    [id]
  );

  if (!suggestion) {
    return res.status(404).json({ error: "Suggestion not found" });
  }

  const comments = await db.all<Comment[]>(
    "SELECT * FROM comments WHERE suggestionId = ? ORDER BY id ASC",
    [id]
  );

  res.json({ ...suggestion, comments });
});

// POST /api/suggestions - create a new suggestion
router.post("/", async (req, res) => {
  const db = await initDB();
  const { title, description, author } = req.body;
  if (!title || !description || !author) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const createdAt = new Date().toISOString();
  const result = await db.run(
    `INSERT INTO suggestions (title, description, author, createdAt)
     VALUES (?, ?, ?, ?)`,
    [title, description, author, createdAt]
  );
  
  const newId = result.lastID;
  const newSuggestion = await db.get<Suggestion>(
    "SELECT * FROM suggestions WHERE id = ?",
    [newId]
  );
  
  res.status(201).json(newSuggestion);
});

// POST /api/suggestions/:id/comments - add a new comment
router.post("/:id/comments", async (req, res) => {
  const db = await initDB();
  const { id } = req.params;
  const { author, text } = req.body;
  
  const suggestion = await db.get<Suggestion>(
    "SELECT * FROM suggestions WHERE id = ?",
    [id]
  );
  if (!suggestion) {
    return res.status(404).json({ error: "Suggestion not found" });
  }
  if (!author || !text) {
    return res.status(400).json({ error: "Missing fields" });
  }
  
  const createdAt = new Date().toISOString();
  const result = await db.run(
    `INSERT INTO comments (suggestionId, author, text, createdAt)
     VALUES (?, ?, ?, ?)`,
    [id, author, text, createdAt]
  );
  const newCommentId = result.lastID;
  
  const newComment = await db.get<Comment>(
    "SELECT * FROM comments WHERE id = ?",
    [newCommentId]
  );
  
  res.status(201).json(newComment);
});

export default router;