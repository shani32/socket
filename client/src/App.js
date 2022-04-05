
import { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client'

let socket;
const CONNECTION_PORT='localhost:3000/'

function App() {
  //before login
  const [loggedIn, setLoggedIn]= useState(true)
  const [rooms, setRooms]=useState('2023');
  const [userName, setUserName]= useState('')

  //after login
  const [message, setMessage]= useState("");
  const [messageList, setMessageList]=useState([{author: 'shani', message: "hello"}])

// useEffect(()=>{
//   socket=io(CONNECTION_PORT)
// },[CONNECTION_PORT])


// useEffect(()=>{
//   socket.on("receive_message", (data)=>{
//     setMessageList([...messageList, data])
//   })
// })
const connectToRoom=()=>{
  setLoggedIn(true)
  socket.emit('join_room', rooms)
}

const sendMessage= async ()=>{
  let messageContent={
    rooms:rooms,
    content:{
    author: userName,
    message:message

    }
    
  }
  await socket.emit("send_message", messageContent)
  setMessageList([...messageList, messageContent.content])
  setMessage("")
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
      : (<div className='chatContainer'>
        <div className='messages'>
          {messageList.map((val, key)=>{
            return (
              <>
             {val.author}  
            <div className='message'>{val.message}</div>
            
            </>
            )
          })}
        </div>
        <div className='messageInputs'>
          <input type="text" placeholder="Message.." onChange={(e)=>{
              setMessage(e.target.value)}}/>
          <button onClick={sendMessage}>Send</button>
        </div>
        </div>)}

      
    </div>
  );
}

export default App;
