import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';

export default function Login({setState}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hitEnterAfterUsername, setHitEnterAfterUsername] = useState(false);
  const [wrongCredentials, setWrongCredentials] = useState(false);

  const userRef = useRef();
  const passRef = useRef();

  useEffect(() => {
    if (hitEnterAfterUsername) {
      passRef.current.focus();
      return;
    }
    userRef.current.focus();
  }, [hitEnterAfterUsername])

  const login = () => {
    axios.post('http://localhost:8080/api/users', {username, password})
    .then(res => {
      const user = res.data.rows[0];
      if (user) {
        setState (prev => ({...prev, user: user}));
      } else {
        setWrongCredentials(true);
        setPassword('');
      }
    })
  }

  return (
    <div>
      <h2>Login!</h2>
      <div>
        <div>
          {wrongCredentials && <h2>Your Username or Password is Invalid!</h2>}
          <label htmlFor="username" >Username:</label>
          <input 
            type="text" 
            name="username" 
            id="username"
            onChange={e => setUsername(e.target.value)}
            value={username}
            onKeyPress={e => e.key === 'Enter' && setHitEnterAfterUsername(true)}
            ref={userRef}
            required
          />
        </div>
        <div>
          <label htmlFor="password" >Password:</label>
          <input 
            type="password" 
            name="password" 
            id="password" 
            onChange={e => setPassword(e.target.value)}
            value={password}
            onKeyPress={e => e.key === 'Enter' && login()}
            ref={passRef}
            required          
          />
        </div>
        <button onClick={() => login()}>LOGIN!</button>
        <h4>No Account? Sign Up!</h4>
        <button onClick={() => setState(prev => ({...prev, signingUp: true}))}>Sing Up</button>
      </div>
    </div>
  );
}