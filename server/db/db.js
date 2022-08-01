const { Pool } = require('pg');

const pool = new Pool({
  user: "user", 
  database: "todolist",
  host: "localhost",
  port: 5432
});

module.exports = pool;