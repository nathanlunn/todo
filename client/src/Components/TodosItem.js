import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import '../Styles/TodosItem.css';

export default function TodosItem({todo, state, setState}) {
  const [confirmation, setConfirmation] = useState(false);
  const [editing, setEditing] = useState(false);
  const [task, setTask] = useState(todo.task);
  const [incomplete, setIncomplete] = useState(false);
  const editRef = useRef();

  useEffect(() => {
    if (editing) {
      editRef.current.focus();
      console.log('editing');
    }
  }, [editing]);

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
    if (todo.task !== task || incomplete) {
      axios.post('http://localhost:8080/api/todos/edit', {task, todoId: todo.id, incomplete})
      .then(res => {
        setState(prev => ({...prev, todos: prev.todos.map(el => {
          if (el.id === todo.id) {
            el.task = task;
            el.completed = !incomplete;
            return el;
          }
          return el;
        })}));
      })
      .catch(err => {
        console.error(err.message); 
      })

      setEditing(false);
      setIncomplete(false);
      return;
    }
    setEditing(false);
  }

  return (
    <div className="todo">
      {!editing && (todo.completed ? <p className="todo__p todo__p--completed">{todo.task}</p> : <p className="todo__p">{todo.task}</p>)}
      
      <div className="todo__buttonBox">
        <div>
          {!todo.completed && !editing && !confirmation && 
            (<button 
              className="todo__button todo__button--markAsComplete" 
              onClick={markAsComplete}
            >Mark as Complete</button>)
          }
        </div>
        <div className="todo__buttonsRight">
          {!editing && !confirmation && 
            (<button
              className="todo__button todo__button--delete"
              name="deleted" 
              onClick={promptConfirmation}
            >X</button>)
          }
          {!editing && !confirmation && 
            (<button 
              className="todo__button todo__button--edit"
              name="edit" 
              onClick={() => {
                setEditing(true);
              }}
            >Edit</button>)
          }
        </div>
      </div>

      {editing && (
        <div className="todo__editBox">
          <div>
            <input
              ref={editRef}
              className="todo__input--taskEdit"
              type="text"
              value={task}
              onChange={e => {setTask(e.target.value)}}
            />
            {todo.completed && (
              <div className="unmarkCompleteBox">
                <label htmlFor="unmarkComplete">Mark as Incomplete</label>
                <input 
                  type="checkbox"
                  name="unmarkComplete"
                  onChange={e => {setIncomplete(e.target.checked);}}
                />
              </div>  
            )}
          </div>
          <div className="todo__editBox--confirmationButtons">
            <button className="todo__button todo__button--confirm" onClick={confirmEdit}>Confirm</button>
            <button className="todo__button todo__button--cancel" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      )}

      {confirmation && (
        <div className="todo__confirmationBox">
          <h4>Are you sure you want to delete this todo?</h4>
          <div>          
            <button className="todo__button todo__button--yes" onClick={deleteTodo}>YES</button>
            <button className="todo__button todo__button--no" onClick={() => setConfirmation(false)}>NO</button>
          </div>
        </div>
      )}
    </div>
  )
}

