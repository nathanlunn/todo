import React, {useState, useEffect} from 'react';
import TodosItem from './TodosItem';
import axios from 'axios';
import '../Styles/Todos.css';

export default function Todos({state, setState}) {
  const [newTodo, setNewTodo] = useState('');
  const [errorMessage, setErroMessage] = useState('');

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErroMessage('');
      }, 2000);
    }
  }, [errorMessage]);

  const addTodo = () => {
    if (newTodo === '') {
      setErroMessage('You cannot create a blank todo');
      return;
    }
    axios.post('http://localhost:8080/api/todos/add', {task: newTodo, userId: state.user.id})
    .then(res => {
      const addedTodo = res.data[0];
      setState(prev => ({...prev, todos: [addedTodo, ...state.todos]}));
    })
    .then(res => {
      setNewTodo('');
      setErroMessage('');
    })
    .catch(err => {
      console.error(err.message);
    })
  }

  const todosArray = state.todos.map(todo => {
    return (
      <TodosItem
        key={todo.id}
        todo={todo}
        setState={setState}
        state={state}
      />
    )
  });

  return (
    <div>
      <div className="userPage">
        <h1>{state.user.username}'s Todos</h1>
        {errorMessage && <h2>{errorMessage}</h2>}
        <div className="userPage__newTodo">
          <input 
            type="text" 
            placeholder="new todo"
            value={newTodo}
            onChange={e => {setNewTodo(e.target.value)}}
            onKeyPress={e => e.key === 'Enter' && addTodo()}
          />
          <button onClick={() => addTodo()}>Create New Todo</button>
        </div>
      </div>

      {todosArray}
    </div>
  )
}