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
    console.error(err.message);
  })
});

//Retrieve POST /api/todos/
router.post('/', (req, res) => {
  const userId = req.body.userId;
  db.query('SELECT * FROM todos WHERE user_id = $1 ORDER BY id DESC;', [userId])
  .then(data => {
    res.send(data.rows);
  })
  .catch(err => {
    console.error(err.message);
  })
});

//Mark as Completed

router.post('/completed', (req, res) => {
  const todoId = req.body.todoId;
  db.query('UPDATE todos SET completed = true WHERE id = $1', [todoId])
  .then(data => {
    res.send('good');
  })
  .catch(err => {
    console.error(err.message); 
  })
})

//Update PATCH /api/todos/edit

router.post('/edit', (req, res) => {
  const task = req.body.task;
  const todoId = req.body.todoId;
  if (req.body.incomplete) {
    db.query('UPDATE todos SET task = $1, completed = false WHERE id = $2', [task, todoId])
    .then(data => {
      res.send('good');
    })
    .catch(err => {
      console.error(err.message);
    })
    return;
  }
  db.query('UPDATE todos SET task = $1 WHERE id = $2', [task, todoId])
  .then(data => {
    res.send('good');
  })
  .catch(err => {
    console.error(err.message);
  })
})

//Delete DELETE /api/todos/delete
router.post('/delete', (req, res) => {
  const todoId = req.body.todoId;
  db.query('DELETE FROM todos WHERE id = $1', [todoId])
  .then(data => {
    res.send('deleted');
  })
  .catch(err => {
    console.error(err.message);
  })
});




module.exports = router;