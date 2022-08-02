import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Todos from './Todos';
import Login from './Login';
import Register from './Register';

function App() {
  const [state, setState] = useState({
    user: {},
    todos: [],
    signingUp: false,
  })
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState({});
  const [signingUp, setSigningUp] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8080/api/todos')
      .then(res => {
        setTodos(res.data);
      })
  }, []);

  return (
    <div className="App">
      {!user.username && !signingUp && <Login setUser={setUser} setSigningUp={setSigningUp}/>}
      {!user.username && signingUp && <Register setUser={setUser} setSigningUp={setSigningUp}/>}
      {user.username && <Todos todos={todos} setTodos={setTodos}/>}
    </div>
  );
}

export default App;
