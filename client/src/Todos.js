import React from 'react';
import TodosItem from './TodosItem';
import axios from 'axios';

export default function Todos({todos}) {
  const addTodo = () => {
    axios 
  }

  const todosArray = todos.map(todo => {
    return (
      <TodosItem
        key={todo.id}
        task={todo.task}
      />
    )
  });

  return (
    <div>
      <h1>Todos</h1>
      {todosArray}
    </div>
  )
}