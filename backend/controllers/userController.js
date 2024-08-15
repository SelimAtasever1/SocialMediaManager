const sqlite3 = require('sqlite3').verbose();
const dbPath = require('path').resolve(__dirname, '../db/links.db'); 
const db = new sqlite3.Database(dbPath); 

exports.login = (req, res) => {
    const { username, password } = req.body;

    db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        if (password === user.password) {  
            res.status(200).json({ message: 'Login successful', user });
        } else {
            res.status(400).json({ error: 'Invalid username or password' });
        }
    });
};

exports.register = (req, res) => {
    const { username, password } = req.body;

    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, password], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'User registered successfully', id: this.lastID });
    });
};
