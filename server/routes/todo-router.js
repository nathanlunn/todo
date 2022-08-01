const express = require('express');
const router = express.Router();
const db = require('../db/db.js');

//Create POST /todos
router.post('/', (req, res) => {
  const task = req.body;
  console.log(task);
})

//Read GET /todos
router.get('/', (req, res) => {
  db.query('SELECT * FROM todos')
  .then(data => {
    res.send(data.rows);
  })
})

//Update PATCH /todos/:id

//Delete DELETE /todos/:id


module.exports = router;