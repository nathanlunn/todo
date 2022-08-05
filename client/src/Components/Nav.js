import React from 'react';
import '../Styles/Nav.css';

export default function Nav({state, setState}) {
  
  
  return(
    <div className="nav">

      <div className="nav__logo">
        <h3>Todo List App</h3>
      </div>

      <div>
        {state.user.username && <button className="nav__button nav__button--logout" onClick={() => {setState(prev => ({...prev, user:{}}))}}>Logout</button>}
        {!state.user.username && !state.signingUp && <button className="nav__button nav__button--singup" onClick={() => {setState(prev => ({...prev, signingUp: true}))}}>Sign Up</button>}
        {!state.user.username && state.signingUp && <button className="nav__button nav__button--login" onClick={() => {setState(prev => ({...prev, signingUp: false}))}}>Login</button>}
      </div>

    </div>
  )
}