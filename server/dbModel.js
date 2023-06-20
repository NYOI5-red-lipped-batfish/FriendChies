require('dotenv').config();
const { Pool } = require('pg');
const connectionString = process.env.CONNECTION_STRING;

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};

//creating SQL tables
