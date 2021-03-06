const express = require('express');
const router = express.Router();
const db = require('../db/db.js');

//Create POST /api/todos/add
router.post('/add', (req, res) => {
  const task = req.body.task;
  const userId = req.body.userId;
  const command = 'INSERT INTO todos (task, user_id) VALUES ($1, $2) RETURNING *;';
  db.query(command, [task, userId])
  .then(data => {
    res.status(201).send(data.rows);
  })
  .catch(err => {
    window.alert(err.message)
  })
})

//Retrieve POST /api/todos/
router.post('/', (req, res) => {
  const userId = req.body.userId;
  db.query('SELECT * FROM todos WHERE user_id = $1;', [userId])
  .then(data => {
    res.send(data.rows);
  })
  .catch(err => {
    window.alert(err.message)
  })
})

//Update PATCH /api/todos/:id

//Delete DELETE /api/todos/:id


module.exports = router;