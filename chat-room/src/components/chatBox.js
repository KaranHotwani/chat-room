import {useState} from 'react'

const ChatBox = (props) => {
    // eslint-disable-next-line
    const [text,setText] = useState('');
    const onSubmit = (e)=>{
        e.preventDefault();
        props.updateChatFn(text)
        setText('');  
      }
    return (
        
        <div>
            <form onSubmit={onSubmit}>
                <input placeholder="Type message" className = "textArea" type="text" value={text} onChange={(e)=>{setText(e.target.value)}}></input>
                <input className="btn" type="submit" value="Submit" />
            </form>
        </div>
    )
}
export default ChatBox