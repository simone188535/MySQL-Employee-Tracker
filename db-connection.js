const mysql = require('mysql2');
// add async here
// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password
      password: '',
      database: 'employer_tracker_db'
    },
    console.log(`Connected to the books_db database.`)
  );

  module.exports = db;