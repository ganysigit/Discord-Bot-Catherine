const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./uid_data.db');

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS uids (
    user_id TEXT NOT NULL,
    type TEXT NOT NULL,
    uid TEXT NOT NULL,
    PRIMARY KEY (user_id, type)
  );
`;

db.serialize(() => {
  db.run(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Table created successfully!');
    }
    db.close();
  });
});
