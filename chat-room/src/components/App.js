import './App.css';
import { useState } from "react";
import ChatBox from './chatBox';
import HomePage from './HomePage';
import { io } from "socket.io-client";
const socket = io("http://localhost:3001");
  socket.on("connect",()=>{
    console.log('connected to server with socket'+socket.id);
  })
function App() {
  
  // eslint-disable-next-line
  const [chats,updateChats] = useState([{id:1,chatData:"Hi Karan"}]);
  const listItems = chats.map(chat=>{
    if(chat.id%2===0)
    {
      return <li key={chat.id}className="container" >{chat.chatData}</li>
    }
    else return <li key={chat.id}className="container darker" >{chat.chatData}</li>;
  })

  // const onSubmit = (e)=>{
  //   e.preventDefault();
  //   const id = Math.floor(Math.random()*10000)+1;
  //   updateChats([...chats,{id:id,chatData:text}]);
  //   setText('');  
  // }
  const updateChatFn = (data)=>{
    console.log("dataaa",data)
    const id = Math.floor(Math.random()*10000)+1;
    const chat = {id:id,chatData:data}
    updateChats([...chats,chat]);
    socket.emit("chat",{chat});
  }
  socket.on("received-msg",(message)=>{
    console.log("received-msg",message);
    updateChats([...chats,message.chat]);
  })
  return (
    
    <div className="App">
        <h1 className="header"> Welcome to Chat Room</h1>
        <div className="chats">
          <ul>{listItems}</ul>
        </div>
        
        <ChatBox updateChatFn={updateChatFn}/>
      {/* <HomePage/> */}
    </div>
  );
}

export default App;