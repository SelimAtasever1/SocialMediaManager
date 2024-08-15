const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

const dbPath = path.resolve(__dirname, '../db/links.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Could not connect to the database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

router.post('/', async (req, res) => {
    const { socialMediaLink, platformName, description } = req.body;
    try {
        const result = await new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO links (socialMediaLink, platformName, description) VALUES (?, ?, ?)`,
                [socialMediaLink, platformName, description],
                function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ id: this.lastID });
                    }
                }
            );
        });
        res.status(201).json({ message: 'Link created successfully', id: result.id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const rows = await new Promise((resolve, reject) => {
            db.all(`SELECT * FROM links`, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    console.log(`Fetching link with ID: ${id}`); 
    try {
        const row = await new Promise((resolve, reject) => {
            db.get(`SELECT * FROM links WHERE id = ?`, [id], (err, row) => {
                if (err) {
                    console.error('Database error:', err.message); 
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });

        if (row) {
            res.status(200).json(row);
        } else {
            res.status(404).json({ error: 'Link not found' });
        }
    } catch (err) {
        console.error('Error:', err.message); 
        res.status(500).json({ error: err.message });
    }
});



router.put('/:id', async (req, res) => {
    const { socialMediaLink, platformName, description } = req.body;
    try {
        const result = await new Promise((resolve, reject) => {
            db.run(
                `UPDATE links SET socialMediaLink = ?, platformName = ?, description = ? WHERE id = ?`,
                [socialMediaLink, platformName, description, req.params.id],
                function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ changes: this.changes });
                    }
                }
            );
        });
        res.status(200).json({ message: 'Link updated successfully', changes: result.changes });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await new Promise((resolve, reject) => {
            db.run(`DELETE FROM links WHERE id = ?`, [req.params.id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ changes: this.changes });
                }
            });
        });
        res.status(200).json({ message: 'Link deleted successfully', changes: result.changes });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
