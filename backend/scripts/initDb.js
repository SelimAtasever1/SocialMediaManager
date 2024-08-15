const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.resolve(__dirname, '../db/links.db');

function initDb() {
    const db = new sqlite3.Database(dbPath);

    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS links (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            socialMediaLink TEXT NOT NULL,
            platformName TEXT NOT NULL,
            description TEXT
        )`, (err) => {
            if (err) {
                console.error('Error creating links table:', err.message);
            } else {
                console.log('Links table created or already exists.');
            }
        });

        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )`, (err) => {
            if (err) {
                console.error('Error creating users table:', err.message);
            } else {
                console.log('Users table created or already exists.');

                db.run(`INSERT OR IGNORE INTO users (username, password) VALUES ('admin', '123')`,
                    (err) => {
                        if (err) {
                            console.error('Error inserting default admin user:', err.message);
                        } else {
                            console.log('Default admin user created.');
                        }
                        db.close((closeErr) => {
                            if (closeErr) {
                                console.error('Error closing the database:', closeErr.message);
                            } else {
                                console.log('Database connection closed.');
                            }
                        });
                    }
                );
            }
        });
    });
}

module.exports = initDb;
