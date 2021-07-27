import {useState,useEffect} from 'react'
import { useHistory, BrowserRouter,Route, Router } from 'react-router-dom';
import './HomePage.css'
import Modal from "react-modal";
import axios from "axios";
import App from "./App";
export default function HomePage() {
    
    const [text,setText] = useState('');
    const [modalIsOpen,setModalIsOpen] = useState(false);
    let  history = useHistory();
    const onSubmit = (e)=>{
        e.preventDefault();
        // props.updateChatFn(text)
        setText('');  
      }
    const setUserNameFn = (e)=>{
        e.preventDefault();
        // setUserName(text);
        localStorage.setItem("userName",text);
        setText(''); 
        setModalIsOpen(false);
    }
    const createRoom = async (e)=>{
        e.preventDefault();
        const roomId = localStorage.getItem("userName")+"-"+Math.floor(Math.random()*10000)+1;
        const result = await axios.post("http://localhost:3001/create-room",{
            roomId:roomId,
            userName:localStorage.getItem("userName"),
            link:`http://localhost:3000/chat/${roomId}`
        });
        console.log(result);
        if(result.data.roomCreated)
        {
            console.log("post request for room creation successful");
            alert(`room created ${roomId}`);
            // joinRoom(e,roomId)
        }
    }
    const joinRoom = async (e)=>{
        e.preventDefault();
        console.log(text);
        const roomId = text;
        const result = await axios.post("http://localhost:3001/join-room",{
            roomId:roomId,
            userName:localStorage.getItem("userName")
        });
        console.log(result);
        if(result.data.roomJoined)
        {
            console.log("post request for room join successful");
            localStorage.setItem("roomId",roomId);
            history.push(`/chat/${roomId}`);
        }
        

    }
    useEffect(()=>{
        //open modal here
        if(localStorage.getItem("userName")===null)
        {
            setModalIsOpen(true);
        }
    },[]);
    return (
        <div>
            <h1>Hello {localStorage.getItem("userName")}</h1>
                    <Modal isOpen={modalIsOpen} onRequestClose={()=>setModalIsOpen(false)}>
                        <form onSubmit={setUserNameFn}>
                            
                            <input placeholder="Enter UserId" className = "room" type="text" value={text} onChange={(e)=>{setText(e.target.value)}}></input>
                            <input className="room-btn" type="submit" value="Submit" />
                        </form>
                    </Modal>
                    <div className="center-div">
                    <form onSubmit={joinRoom}>
                        
                        <input placeholder="Join-Room" className = "room" type="text" value={text} onChange={(e)=>{setText(e.target.value)}}></input>
                        <input className="room-btn" type="submit" value="Submit" />
                    </form>
                    <form onSubmit={createRoom}>
                        <input className="create-room-btn" type="submit" value="CreateRoom" />
                    </form>
                    </div>
        </div>
        
    )
}
