const express = require('express');
const router = express.Router();

const todos = {
  abc: {
    id: 'abc',
    task: 'do thing 1'
  },
  def: {
    id: 'def',
    task: 'stop being so lazy with todo ideas'
  },
  ghi: {
    id: 'ghi',
    task: 'do thing 3'
  }
}

//Create POST /todos

//Read GET /todos
router.get('/', (req, res) => {
  const todosArray = Object.values(todos);
  res.json(todosArray);
})

//Update PATCH /todos/:id

//Delete DELETE /todos/:id


module.exports = router;