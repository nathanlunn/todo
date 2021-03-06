import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Todos from './Todos';
import Login from './Login';
import Register from './Register';

function App() {
  const [state, setState] = useState({
    user: {},/* temporary logged in illusion before login page*/
    todos: [],
    signingUp: false,
  })

  useEffect(() => {
    axios.post('http://localhost:8080/api/todos', {userId: state.user.id})
      .then(res => {
        setState(prev => ({...prev, todos: res.data}));
      })
  }, [state.user]);

  return (
    <div className="App">
      {!state.user.username && !state.signingUp && <Login setState={setState}/>}
      {!state.user.username && state.signingUp && <Register setState={setState}/>}
      {state.user.username && <Todos state={state} setState={setState}/>}
    </div>
  );
}

export default App;
