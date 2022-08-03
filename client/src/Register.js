import React, {useState} from 'react';
import axios from 'axios';

export default function Register({setState}) {


  return (
    <div>
      <button onClick={() => {setState(prev => ({...prev, signingUp: false}))}}>Login</button>
    </div>
  );
}