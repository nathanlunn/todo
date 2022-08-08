import axios from "axios";
import React, { useState } from "react";
import '../Styles/TodosItem.css';

export default function TodosItem({todo, state, setState}) {
  const [confirmation, setConfirmation] = useState(false);
  const [editing, setEditing] = useState(false);
  const [task, setTask] = useState(todo.task);

  const promptConfirmation = () => {
    setConfirmation(true);
  }

  const markAsComplete = () => {
    axios.post('http://localhost:8080/api/todos/completed', {todoId: todo.id})
    .then(res => {
      setState(prev => ({...prev, todos: prev.todos.map(el => {
        if (el.id === todo.id) {
          el.completed = true;
          return el;
        }
        return el;
      })}));
    })
    .catch(err => {
      console.error(err.message);
    })
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

  const confirmEdit = () => {
    if (todo.task !== task) {
      axios.post('http://localhost:8080/api/todos/edit', {task, todoId: todo.id})
      .then(res => {
        setState(prev => ({...prev, todos: prev.todos.map(el => {
          if (el.id === todo.id) {
            el.task = task;
            return el;
          }
          return el;
        })}));
      })
      .catch(err => {
        console.error(err.message); 
      })

      setEditing(false);
      return;
    }
    setEditing(false);
  }

  return (
    <div className="todo">
      {!editing && (todo.completed ? <p className="todo__p todo__p--completed">{todo.task}</p> : <p className="todo__p">{todo.task}</p>)}
      {!todo.completed && <button onClick={markAsComplete}>Mark as Complete</button>}
      {!editing && <button name="deleted" onClick={promptConfirmation}>X</button>}
      {!editing && <button name="edit" onClick={() => {setEditing(true)}}>Edit</button> }
      {editing && (
        <div>
          <input
            type="text"
            value={task}
            onChange={e => {setTask(e.target.value)}}
          />
          {/* {todo.completed && (
            <div>
              <label for="unmarkComplete">Mark as Incomplete</label>
              <input 
                type="checkbox"
                name="unmarkComplete"
              />
            </div>  
          )} */}
          <button onClick={confirmEdit}>Confirm</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
      )}

      {confirmation && (
        <div>
          <h4>Are you sure you want to delete this todo?</h4>
          <button onClick={deleteTodo}>YES</button>
          <button onClick={() => setConfirmation(false)}>NO</button>
        </div>
      )}
    </div>
  )
}

