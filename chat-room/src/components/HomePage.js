import {useState} from 'react'
import './HomePage.css'
export default function HomePage() {
    const [text,setText] = useState('');
    const onSubmit = (e)=>{
        e.preventDefault();
        // props.updateChatFn(text)
        setText('');  
      }
    return (
        <div>
             <h1>Hello User</h1>
             <div className="center-div">
            <form onSubmit={onSubmit}>
                
                <input placeholder="Join-Room" className = "room" type="text" value={text} onChange={(e)=>{setText(e.target.value)}}></input>
                <input className="room-btn" type="submit" value="Submit" />
            </form>
            <form onSubmit={onSubmit}>
                
                <input placeholder="Create-Room" className = "room" type="text" value={text} onChange={(e)=>{setText(e.target.value)}}></input>
                <input className="room-btn" type="submit" value="Submit" />
            </form>
        </div>
        </div>
        
    )
}
