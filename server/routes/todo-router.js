const express = require('express');
const router = express.Router();
const db = require('../db/db.js');

//Create POST /todos
router.post('/', (req, res) => {
  const task = req.body.newTodo;
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

//Read GET /todos
router.get('/', (req, res) => {
  db.query('SELECT * FROM todos')
  .then(data => {
    res.send(data.rows);
  })
  .catch(err => {
    window.alert(err.message)
  })
})

//Update PATCH /todos/:id

//Delete DELETE /todos/:id


module.exports = router;