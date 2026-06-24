const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ================= DATABASE =================

const db = new sqlite3.Database("./database/bookwise.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to SQLite Database!");
  }
});

// ================= USERS TABLE =================

db.run(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE,
  favorite_genre TEXT
)
`);

// ================= BOOKS TABLE =================

db.run(`
CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  author TEXT,
  genre TEXT,
  image_url TEXT
)
`);

// ================= SAMPLE USER =================

db.run(`
INSERT OR IGNORE INTO users
(id,name,email,favorite_genre)
VALUES
(
1,
'Sadiya',
'sadiya@email.com',
'Self Help'
)
`);

// ================= SAMPLE BOOKS =================

db.run(`
INSERT OR IGNORE INTO books
(id,title,author,genre,image_url)
VALUES

(
1,
'Atomic Habits',
'James Clear',
'Self Help',
'https://covers.openlibrary.org/b/id/10521270-L.jpg'
),

(
2,
'The Alchemist',
'Paulo Coelho',
'Fiction',
'https://covers.openlibrary.org/b/id/8231856-L.jpg'
),

(
3,
'Deep Work',
'Cal Newport',
'Productivity',
'https://covers.openlibrary.org/b/id/10594765-L.jpg'
),

(
4,
'The Power of Habit',
'Charles Duhigg',
'Self Help',
'https://covers.openlibrary.org/b/id/6979861-L.jpg'
),

(
5,
'Think and Grow Rich',
'Napoleon Hill',
'Self Help',
'https://covers.openlibrary.org/b/id/7222246-L.jpg'
)
`);

// ================= GET ALL BOOKS =================

app.get("/api/books", (req, res) => {
  db.all("SELECT * FROM books", [], (err, rows) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(rows);
  });
});

// ================= LOGIN =================

app.post("/api/login", (req, res) => {
  const { email } = req.body;

  db.get(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, user) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.json({
        success: true,
        user,
      });
    }
  );
});

// ================= RECOMMENDATIONS =================

app.get("/api/recommendations/:userId", (req, res) => {
  const userId = req.params.userId;

  db.get(
    "SELECT favorite_genre FROM users WHERE id = ?",
    [userId],
    (err, user) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      db.all(
        "SELECT * FROM books WHERE genre = ?",
        [user.favorite_genre],
        (err, books) => {
          if (err) {
            return res.status(500).json(err);
          }

          res.json(books);
        }
      );
    }
  );
});

// ================= SERVER =================

const PORT = 5000;
app.get("/test123", (req, res) => {
  res.send("Route is working");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});