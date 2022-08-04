import React, {useState} from 'react';
import TodosItem from './TodosItem';
import axios from 'axios';

export default function Todos({state, setState}) {
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    axios.post('http://localhost:8080/api/todos/add', {task: newTodo, userId: state.user.id})
    .then(res => {
      const addedTodo = res.data[0];
      setState(prev => ({...prev, todos: [addedTodo, ...state.todos]}));
    })
    .then(res => {
      setNewTodo('');
    })
    .catch(err => {
      console.error(err.message);
    })
  }

  const todosArray = state.todos.map(todo => {
    return (
      <TodosItem
        key={todo.id}
        task={todo.task}
      />
    )
  });

  return (
    <div>
      <h1>{state.user.username}'s Todos</h1>
      <input 
        type="text" 
        placeholder="new todo"
        value={newTodo}
        onChange={e => {setNewTodo(e.target.value)}}
        onKeyPress={e => e.key === 'Enter' && addTodo()}
      />
      <button onClick={() => addTodo()}>Create New Todo</button>
      {todosArray}
    </div>
  )
}