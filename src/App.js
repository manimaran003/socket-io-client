import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import './App.css'
import Chat from './Chat'
import {toast,ToastContainer} from 'react-toastify'
const App = () => {
  let socket = io.connect("http://localhost:3001")
  const [state, setState] = useState({
    username: "",
    room: ""
  })
  const [show,setShow]=useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target
    setState({ ...state, [name]: value })
  }
  const joinRoom = (e) => {
    e.preventDefault()
    if (state.username !== "" && state.room !== "") {
      socket.emit("join_room", state.room)
      setShow(true)
      setTimeout(()=>{
        setShow(false)
      },4000)
    }
  }
  return (
    <>
      <div className="main-header">
        <div className='container'>
          <div className='d-flex justify-content-center mt-3'>
            <h2>Chat Application</h2>
          </div>
          {show && <p>{state.username} joined in group</p>}
          <div className='row mt-4'>
            <div className="col-6">
              <form>
                <label htmlFor="exampleFormControlInput1" className="form-label">username</label>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">@</span>
                  <input type="text" name="username" value={state.username} onChange={handleChange} className="form-control" placeholder="Username" id="exampleFormControlInput1" />

                </div>
                <label className="form-label">room</label>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">@</span>
                  <input type="text" name="room" value={state.room} onChange={handleChange} className="form-control " placeholder="room" aria-label="Username" id="exampleFormControlInput2" aria-describedby="basic-addon1" />

                </div>

                <div className="d-flex justify-content-center mt-3">
                  <button type="button" onClick={joinRoom} className="btn btn-lg btn-primary login-btn">Join</button>
                </div>
              </form>
            </div>
            <div className="col-6">
              <Chat name={state.username} room={state.room} socket={socket}/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default App

