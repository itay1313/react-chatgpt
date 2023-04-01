// import logo from './logo.svg';
import React, { useState } from 'react';
import './normal.css';
import './App.css';

function App() {
  // add state for input 
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([{
    user: "gpt",
    message: "How can I help you?"
  },
  {
    user: "me",
    message: "I want to buy a new phone"
  }]);

  //clear chats
  function clearChat() {
    setChatLog([]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await setChatLog([...chatLog, { user: "me", message: `${input}` }])
    await setInput("");
    const message = chatLog.map((message) => message.message).join("\n");
    const response = await fetch('http://localhost:3080/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: message })

    });
    const data = await response.json();
    await setChatLog([...chatLog, { user: "gpt", message: `${data.message}` }])
  }

  return (
    <div className='App'>
      <aside className='sidemenu box-component'>
        <button className="btn btn-hover" onClick={clearChat}>
          <span className="btn-text">New Chat</span>
        </button>
      </aside>
      <main className='chatbox flex-col'>
        <header className="flex fullwidth justify-between">
          <div className="logo">Heyi</div>
        </header>
        <div className="chat-log">
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
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
      <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>
        <img className="avatar" alt="profile" src=
          {message.user === "gpt" ? 'https://res.cloudinary.com/damqsjjsn/image/upload/v1641745444/Mask_Group_1_ifmexq.png' : 'https://res.cloudinary.com/damqsjjsn/image/upload/v1641672156/samples/people/boy-snow-hoodie.jpg'} /></div>
      <div className="message">{message.message}</div>
    </div>
  )
}

export default App;
