const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors()); // Allows your React app to talk to this server
app.use(express.json());

// 1. Connect to MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Your MySQL username
    password: 'password', // Your MySQL password
    database: 'book_recommendation'
});

db.connect(err => {
    if (err) console.error('Database connection failed: ' + err.stack);
    else console.log('Connected to MySQL Database!');
});

// 2. API to get all books
app.get('/api/books', (req, res) => {
    db.query('SELECT * FROM books', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// 3. API for Recommendations based on User 1's favorite genre
app.get('/api/recommendations/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = `
        SELECT b.* FROM books b 
        WHERE b.genre = (
            SELECT b2.genre FROM user_history uh 
            JOIN books b2 ON uh.book_id = b2.book_id 
            WHERE uh.user_id = ? 
            GROUP BY b2.genre ORDER BY COUNT(*) DESC LIMIT 1
        ) 
        AND b.book_id NOT IN (SELECT book_id FROM user_history WHERE user_id = ?)`;

    db.query(query, [userId, userId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));