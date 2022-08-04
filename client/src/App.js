import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Todos from './Components/Todos';
import Login from './Components/Login';
import Register from './Components/Register';
import Nav from './Components/Nav';
import './Styles/App.css';

function App() {
  const [state, setState] = useState({
    user: {},
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
      <Nav state={state} setState={setState}/>

      <div className="main" >      
        {!state.user.username && !state.signingUp && <Login setState={setState}/>}
        {!state.user.username && state.signingUp && <Register setState={setState}/>}
        {state.user.username && <Todos state={state} setState={setState}/>}
      </div>
    </div>
  );
}

export default App;
