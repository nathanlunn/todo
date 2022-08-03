const express = require('express');
const router = express.Router();
const db = require('../db/db.js');

//check login credentials POST /api/users
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
    console.error(err.message)
  })
});

//Create user POST /api/users/register
router.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const image = req.body.image;

  db.query('SELECT username FROM users;')
  .then(data => {
    const usernames = data.rows.map(names => names.username);
    if (usernames.includes(username)){
      res.send('used');
      return;
    }
    db.query('INSERT INTO users (username, password, avatar) VALUES ($1, $2, $3) RETURNING *;', [username, password, image])
    .then(data => {
      res.send(data.rows)
    })
    .catch(err => {
      console.error(err.message);
    })
  })
  .catch(err => {
    console.error(err.message);
  })

});

//Update PATCH /users/:id

//Delete DELETE /users/:id


module.exports = router;