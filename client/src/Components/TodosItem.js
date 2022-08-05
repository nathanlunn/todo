import axios from "axios";
import React, { useState } from "react";

export default function TodosItem({todo, setState}) {
  const [confirmation, setConfirmation] = useState(false)

  const promptConfirmation = () => {
    setConfirmation(true);
  }

  const deleteTodo = () => {
    axios.post('http://localhost:8080/api/todos/delete', {todoId: todo.id})
    .then(res => {
      setState(prev => ({...prev, todos: prev.todos.filter(eachTodo => eachTodo.id !== todo.id)}));
      setConfirmation(false);
    })
    .catch(err => {
      console.error(err.message);
    })
  }

  return (
    <li>
      {todo.task}
      <button onClick={promptConfirmation}>X</button>
      {confirmation && (
        <div>
          <h4>Are you sure you want to delete this todo?</h4>
          <button onClick={deleteTodo}>YES</button>
          <button onClick={() => setConfirmation(false)}>NO</button>
        </div>
      )}
    </li>
  )
}

