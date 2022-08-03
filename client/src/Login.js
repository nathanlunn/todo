import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';

export default function Login({setState}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hitEnterAfterUsername, setHitEnterAfterUsername] = useState(false);

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
    axios.get('/http://localhost:8080/api/users')
  }

  return (
    <div>
      <h2>Login!</h2>
      <div>
        <div>
          <label for="username" >Username:</label>
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
          <label for="password" >Password:</label>
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
      </div>
    </div>
  );
}