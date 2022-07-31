const { Pool } = require('pg');

const pool = new Pool({
  user: "user", 
  database: "todo",
  host: "localhost",
  port: 5432
});

module.exports = pool;