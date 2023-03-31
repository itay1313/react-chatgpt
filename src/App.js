// import logo from './logo.svg';
import { useState } from 'react';
import './normal.css';
import './App.css';

function App() {
  // add state for input 
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([{
    user: "gpt",
    message: "How can I help you?"
  }]);

  async function handleSubmit(e) {
    e.preventDefault();
    setChatLog([...chatLog, { user: "me", message: `${input}` }])
    setInput("");
  }

  return (
    <div className='App'>
      <aside className='sidemenu box-component'>
        <button class="btn btn-hover">
          <span class="btn-text">New Chat</span>
        </button>
      </aside>
      <main className='chatbox'>
        <header class="flex fullwidth justify-between">
          <div class="logo">Heyi</div>
        </header>
        <h1>Main</h1>
        <div className="chat-log">
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          <div className="chat-message chatgpt">
            <div className="avatar"><img class="avatar" alt="profile" src="https://res.cloudinary.com/damqsjjsn/image/upload/v1641745444/Mask_Group_1_ifmexq.png" /></div>
            <div className="message">Hello world</div>
          </div>
        </div>
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input
              rows="1"
              value={input}
              className='chat-input-textarea'
              onChange={(e) => setInput(e.target.value)}
              placeholder='Type your message here'
            ></input>
          </form>
        </div>
      </main>
    </div>
  );
}


const ChatMessage = ({ message }) => {
  return (
    <div className="chat-message">
      <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}><img class="avatar" alt="profile" src="https://res.cloudinary.com/damqsjjsn/image/upload/v1641745444/Mask_Group_1_ifmexq.png" /></div>
      <div className="message">{message.message}</div>
    </div>
  )
}

export default App;
