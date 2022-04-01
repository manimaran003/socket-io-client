import React, { useState } from "react";

const Chat=(props)=>{
    const{name,room,socket}=props
    const[chats,setChats]=useState([])
    const handleChange=(e)=>{
        setChats(e.target.value)
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(chats!==""){
            let messageData={
                room:room,
                author:name,
                message:chats,
            }
            socket.emit("send_message",messageData)
        }
    }
    return (
        <>
        <div>
            <h2>live chat</h2>
            <div>
                <input placeholder="hey" onChange={handleChange} name="chats" value={chats}/>
                <button onClick={handleSubmit}>send</button>
            </div>
        </div>
        </>
    )
}

export default Chat