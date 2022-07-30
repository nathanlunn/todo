import React from 'react';

export default function Todos({todos}) {
  console.log(todos);
  let todosArray;
  for (let todo of todos) {
    todosArray.push(todo.task);
  }

  return (
    <div>
      <h1>Todos</h1>
      { todosArray }
    </div>
  )
}