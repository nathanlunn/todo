const express = require('express');
const router = express.Router();
const db = require('../db/db.js');

//Create POST /users
router.post('/', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query('SELECT * FROM users WHERE username = $1 AND password = $2;', [username, password])
  .then(data => {
    if (data) {
      res.send(data);
    }
  })
  .catch(err => {
    window.alert(err.message)
  })
})

//Read GET /users

//Update PATCH /users/:id

//Delete DELETE /users/:id


module.exports = router;