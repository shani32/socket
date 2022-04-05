
import { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client'

let socket;
const CONNECTION_PORT='localhost:3004/'

function App() {
  const [loggedIn, setLoggedIn]= useState(false)

  const [rooms, setRooms]=useState('');
  const [userName, setUserName]= useState('')

useEffect(()=>{
  socket=io(CONNECTION_PORT)
},[CONNECTION_PORT])

const connectToRoom=()=>{
  setLoggedIn(true)
  socket.emit('join_room', rooms)
}

  return (
    <div className="App">
      {!loggedIn ?
      (
        <div className='login'>
          <div className='inputs'>
            <input type='text' placeholder='Enter Your Name' onChange={(e)=>{
              setUserName(e.target.value)
            }}/>
            <input type='text' placeholder='Enter Room Number' onChange={(e)=>{
              setRooms(e.target.value)}}/>
          </div>
          <button onClick={connectToRoom}>Enter Chat</button>
        </div>
      )
      : (<h1>you are logged in</h1>)}

      
    </div>
  );
}

export default App;
