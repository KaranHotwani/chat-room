import './App.css';
import { useState } from "react";
import ChatBox from './chatBox';
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
    updateChats([...chats,{id:id,chatData:data}]);
  }
  return (
    
    <div className="App">
      <h1 className="header"> Welcome to Chat Room</h1>
      <div className="chats">
        <ul>{listItems}</ul>
      </div>
      
      <ChatBox updateChatFn={updateChatFn}/>
    </div>
  );
}

export default App;