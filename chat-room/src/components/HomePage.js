import {useState,useEffect} from 'react'
import { useHistory, BrowserRouter,Route, Router } from 'react-router-dom';
import './HomePage.css'
import Modal from "react-modal";
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
    const createRoom = (e)=>{
        e.preventDefault();
        const roomId = localStorage.getItem("userName")+"-"+Math.floor(Math.random()*10000)+1;
        localStorage.setItem("roomId",roomId);
        // history.push("/chat");
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
            {/* <Router>
                <Route path='/chat' component={App} />
            </Router> */}
            <h1>Hello {localStorage.getItem("userName")}</h1>
                    <Modal isOpen={modalIsOpen} onRequestClose={()=>setModalIsOpen(false)}>
                        <form onSubmit={setUserNameFn}>
                            
                            <input placeholder="Enter UserId" className = "room" type="text" value={text} onChange={(e)=>{setText(e.target.value)}}></input>
                            <input className="room-btn" type="submit" value="Submit" />
                        </form>
                    </Modal>
                    <div className="center-div">
                    <form onSubmit={onSubmit}>
                        
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
