const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create or connect to the SQLite database
const dbPath = path.join(__dirname, 'game_history.db');
const db = new sqlite3.Database(dbPath);

// Create table for game history
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS game_history (
                game_id INTEGER PRIMARY KEY AUTOINCREMENT,
                board_size INTEGER,
                winner TEXT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)`);
});

// Function to insert a game record into the database
function insertGame(boardSize, winner, moves) {
    db.run(`INSERT INTO game_history (board_size, winner) VALUES (?, ?)`,
        [boardSize, winner, JSON.stringify(moves)],
        (err) => {
            if (err) {
                console.error('Error inserting game:', err.message);
            } else {
                console.log('Game record inserted successfully.');
            }
        });
}

// Function to retrieve game history from the database
function getGameHistory(callback) {
    db.all(`SELECT * FROM game_history`, (err, rows) => {
        if (err) {
            console.error('Error retrieving game history:', err.message);
            callback([]);
        } else {
            callback(rows);
        }
    });
}

// Insert a game record
insertGame(document.getElementById("table_size").value, 
        document.getElementById("turn").innerHTML = player[turn]);

// Retrieve game history
getGameHistory((history) => {
    console.log('Game History:');
    console.log(history);
});

// Close the database connection when done
process.on('exit', () => {
    db.close();
});
