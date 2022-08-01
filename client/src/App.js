import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Todos from './Todos';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/todos')
      .then(res => {
        setTodos(res.data);
      })
  }, []);

  return (
    <div className="App">
      <Todos todos={todos} setTodos={setTodos}/>
    </div>
  );
}

export default App;
