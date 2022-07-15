import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Todos from './Todos';

function App() {
  useEffect(() => {
    axios.get('http://localhost:8080/api/todos')
      .then(res => {
        console.log(res.data);
      })
  }, []) 

  return (
    <div className="App">
      <Todos/>
    </div>
  );
}

export default App;
