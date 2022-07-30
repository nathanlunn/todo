import React from 'react';
import TodosItem from './TodosItem';

export default function Todos({todos}) {
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