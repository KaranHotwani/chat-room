import './App.css';
import { useState,useEffect } from "react";
import ChatBox from './chatBox';
import { io } from "socket.io-client";
import axios from "axios";
const socket = io("http://localhost:3001");
  socket.on("connect",()=>{
    console.log('connected to server with socket'+socket.id);
  })
function App() {
  
  // eslint-disable-next-line
  const [chats,updateChats] = useState([]);
  const handleLikeClick = async (chat)=>{
    console.log("like clicked",chat);
    const result = await axios.post(`http://localhost:3001/like_chat`,{
      chatId:chat.docId,
      userName:localStorage.getItem("userName"),
      roomId: localStorage.getItem("roomId")
    });
    console.log(result);
    window.location.reload();
  }
  const [isHovering, setIsHovering] = useState(false);
  const [showLikes,setShowLikes] = useState(["hi"]);
  const handleMouseOver = (likes) => {
    setShowLikes(likes);
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setShowLikes([]);
    setIsHovering(false);
    
  };
  const listItems = chats.map(chat=>{
    const userName = localStorage.getItem("userName");
    if(chat.sentBy!==userName)
    {
      if(chat.likedBy.includes(userName)){
        return (
          <div key={chat.id} className="container">
            <li key={chat.id} >{chat.chatData}</li>
            <button className="like-btn liked" onClick={()=>handleLikeClick(chat)}>👍</button>
            {chat.likedBy.length>0 && <div className="count" onMouseOver={()=>handleMouseOver(chat.likedBy)} onMouseOut={handleMouseOut} >{chat.likedBy.length}</div>}
            {/* {chat.likedBy.length} */}
          </div>);
      }
      else
      {
        return (
          <div key={chat.id} className="container">
            <li key={chat.id} >{chat.chatData}</li>
            <button className="like-btn" onClick={()=>handleLikeClick(chat)}>👍</button>
            {chat.likedBy.length>0 && <div className="count" onMouseOver={()=>handleMouseOver(chat.likedBy)} onMouseOut={handleMouseOut} >{chat.likedBy.length}</div>}
            {/* {chat.likedBy.length} */}
          </div>);
      }
    }
    else {
      if(chat.likedBy.includes(userName)){
        return (
          <div  key={chat.id}className="container darker">
            <li key={chat.id} >{chat.chatData}</li>
            <button className="like-btn liked" onClick={()=>handleLikeClick(chat)}>👍</button>
            {chat.likedBy.length>0 && <div className="count" onMouseOver={()=>handleMouseOver(chat.likedBy)} onMouseOut={handleMouseOut} >{chat.likedBy.length}</div>}
            {/* {chat.likedBy.length} */}
          </div>);
      }
      else{
        return (
          <div  key={chat.id}className="container darker">
            <li key={chat.id} >{chat.chatData}</li>
            <button className="like-btn" onClick={()=>handleLikeClick(chat)}>👍</button>
            {chat.likedBy.length>0 && <div className="count" onMouseOver={()=>handleMouseOver(chat.likedBy)} onMouseOut={handleMouseOut} >{chat.likedBy.length}</div>}
            {/* {chat.likedBy.length} */}
          </div>);
      }

    }
    // <div><li key={chat.id}className="container darker" >{chat.chatData}</li></div>;
  })

  // const onSubmit = (e)=>{
  //   e.preventDefault();
  //   const id = Math.floor(Math.random()*10000)+1;
  //   updateChats([...chats,{id:id,chatData:text}]);
  //   setText('');  
  // }
  useEffect(()=>{
    const fetchData = async()=>{
      const roomId = localStorage.getItem("roomId");
      socket.emit("join-room",roomId)
      const result = await axios.get(`http://localhost:3001/get_chats/${roomId}`);
      console.log(result);
      if(result.data.data.length>0)
      {
        var resultChats = [];
        result.data.data.map(chat=>resultChats.push(chat))
        updateChats(resultChats);
      }
    }
    fetchData();
    
},[]);

  // const getRoomChatData = async()=>{
  //   const result = await axios.get(`http://localhost:3001/get_chats/${roomId}`);
  //     console.log(result);
  //     if(result.data.data.length>0)
  //     {
  //       var resultChats = [];
  //       result.data.data.map(chat=>resultChats.push(chat))
  //       updateChats(resultChats);
  //     }
  // }
  const updateChatFn = (data)=>{
    console.log("dataaa",data)
    const id = Math.floor(Math.random()*10000)+1;
    const chat = {id:id,chatData:data,userName:localStorage.getItem("userName")}
    // updateChats([...chats,chat]);
    socket.emit("chat",chat,localStorage.getItem("roomId"));
  }
  socket.on("received-msg",(message)=>{
    console.log("received-msg",message);
    updateChats([...chats,message]);
  })
  return (
    <div>
      <div className="App">
              <h1 className="header"> Welcome to Chat Room - {localStorage.getItem("roomId")}</h1>
              <div className="chats">
                <ul>{listItems}</ul>
              </div>
              
              <ChatBox updateChatFn={updateChatFn}/>
            {/* <HomePage/> */}
      </div>
      <div className="like-box">
        {isHovering && <ul>{showLikes.map(like=><div>{like}</div>)}</ul>}
      </div> 
    </div>
    
  );
}

export default App;