import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';

export default function Register({setState}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [focus, setFocus] = useState('user');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  
  const userRef = useRef();
  const passRef = useRef();
  const confirmRef = useRef();
  
  useEffect(() => {
    if(focus === 'user') {
      userRef.current.focus();
    } else if(focus === 'pass') {
      passRef.current.focus();
    } else if (focus === 'confirm') {
      confirmRef.current.focus();
    }
  }, [focus])

  const signUp = () => {
    if (password !== confirmPassword) {
      setError('Passwords are not the same');
      return;
    }
    axios.post('http://localhost:8080/api/users/register', {username, password, image})
    .then(res => {
      if(res.data === 'used') {
        setError('That username is already in use');
        return;
      }
      setState(prev => ({...prev, user: res.data[0], signingUp: false}));
    })
    .catch(err => {
      console.error(err.message);
    })
  }

  return (
    <div>
      <h1>Register</h1>

      {error && <h3>{error}</h3>}

      <div>
        <div>
          <label for="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={e => {setUsername(e.target.value)}}
            onKeyPress={e => e.key === 'Enter' && setFocus('pass')}
            ref={userRef}
            required
          />
        </div>
        <div>
          <label for="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={e => {setPassword(e.target.value)}}
            onKeyPress={e => e.key === 'Enter' && setFocus('confirm')}
            ref={passRef}
            required
          />
        </div>
        <div>
          <label for="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={e => {setConfirmPassword(e.target.value)}}
            onKeyPress={e => e.key === 'Enter' && signUp()}
            ref={userRef}
            required
          />
        </div>
        <div>
          <label>Select Image for Avatar:</label>
          <input 
            type="file"
            onChange={e => {setImage(e.target.files[0])}}
          />
        </div>
      </div>

      <button onClick={() => signUp()}>Sign Up!</button>
      <h4>Already Have an Account? Login!</h4>
      <button onClick={() => {setState(prev => ({...prev, signingUp: false}))}}>Login</button>
    </div>
  );
}