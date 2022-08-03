const express = require('express');
const router = express.Router();
const db = require('../db/db.js');

//Create POST /users
router.post('/', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query('SELECT * FROM users;')
  .then(data => {
    console.log(data.rows);
  })
})

//Read GET /users

//Update PATCH /users/:id

//Delete DELETE /users/:id


module.exports = router;