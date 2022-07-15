import React, {useEffect} from 'react';
import axios from 'axios';

export default function Todos() {
  useEffect(() => {
    axios.get('/api/todos')
      .then(res => {
        console.log(res);
      })
  }, [])

  return (
    <div>
      Hello World
    </div>
  )
}