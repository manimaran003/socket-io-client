import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Chat from './Chat'
const App=()=>{
  let socket=io.connect("http://localhost:3001")
  const [state,setState]=useState({
    username:"",
    room:""
  })
  const handleChange=(e)=>{
    const {name,value}=e.target
    setState({...state,[name]:value})
  }
  const joinRoom=(e)=>{
    e.preventDefault()
    if(state.username!=="" &&state.room!==""){
      socket.emit("join_room",state.room)
    }
  }
  useEffect(()=>{
    socket.on("received_message",(data)=>{
      console.log("recieved",data)
    })
  },[socket])
  return (
    <>
    <div>
      <input name="username" value={state.username} onChange={handleChange}/>
      <input  name="room" value={state.room} onChange={handleChange}/>
      <button onClick={joinRoom}>Join</button>
      <Chat name={state.username} room={state.room} socket={socket}/>
    </div>
    </>
  )
}
export default App

