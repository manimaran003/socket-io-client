import React, { useState,useEffect} from "react";
const Chat=(props)=>{
    const{name,room,socket}=props
    const[chats,setChats]=useState([])
    const [messageList,setmessageList]=useState([])
    const handleChange=(e)=>{
        setChats(e.target.value)
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(chats!==""){
            let messageData={
                room:room,
                author:name,
                message:chats,
            }
            await socket.emit("send_message",messageData)
            //setmessageList((list)=>[...list,messageData])
            setChats("")
        }
    }
    useEffect(() => {
        socket.on("received_message", (data) => {
          console.log("recieved from  clients", data)
          setmessageList((list)=>[...list,data])
        })
      }, [socket])
      console.log(messageList)
    return (
        <>
        <div>
            <h2>live chat</h2>
            <div className='d-flex justify-content-center'>
            <div className="card" style={{ width: "30rem" }}>
              <div className="card-body justify-content-center d-flex">
                <h5 className="card-title">Chat App</h5>
              </div>
              <div className="card" style={{ width: "30rem", height: "30rem" }}>
                  {
                      messageList.map((item)=>{
                          return (
                              <>
                              <div style={{width:"100%"}}>
                              <div className={name===item.author?"msgLeft":"msgRight"}>
                                <div style={{width:'100px',background:`${name===item.author?"red":"green"}`}}>
                                <p> {item.message}</p>
                                    </div>
                              </div>
                              </div>
                              </>
                          )
                      })
                  }
              </div>
              <div className="card-body d-flex justify-content-end">
              <div>
                <input placeholder="hey" onChange={handleChange} name="chats" value={chats}/>
                <button onClick={handleSubmit}>send</button>
            </div>
              </div>
            </div>
          </div>
        </div>
        </>
    )
}

export default Chat