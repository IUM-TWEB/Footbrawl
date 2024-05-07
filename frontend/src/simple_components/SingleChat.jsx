import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io();

const SingleChat = () => {
  const { id: currentRoom } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  //prendere il nome dai dati di login
  const myName = localStorage.getItem('my_name') || "io";

  useEffect(() => {
    socket.emit('create or join', currentRoom, myName);
    //localStorage.setItem('room', currentRoom);

    socket.on('create or join', (name) => {
      if (name !== myName) {
        const joinMessage = { text: `${name} has joined the conversation`, author: "System" };
        setMessages(prevMessages => [...prevMessages, joinMessage]);
      }
    });

    socket.on('chat message', (msg, name) => {
      const newMessage = { text: msg, author: name === myName ? "Me" : name };
      setMessages(prevMessages => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off('chat message');
      socket.off('create or join');
    };
  }, [currentRoom, myName]);

  const sendMessage = () => {
    if (message) {
      socket.emit('chat message', currentRoom, message, myName);
      setMessages(prevMessages => [...prevMessages, { text: message, author: "Me" }]);
      setMessage('');
    }
  };

  const logout = () => {
    localStorage.clear();
    socket.emit('leave conversation', currentRoom, myName);
    navigate(-1);
  };

  return (
    <div className="container mt-5 w-100" id="message_container">
      <div className="row">
        <h2 className="col-md-10">Benvenuto nella chat {currentRoom}</h2>
        <button id="logout" className="btn btn-small btn-danger col-md-2" onClick={logout}>Logout</button>
      </div>

      <ul id="messages" style={{backgroundColor: 'bisque'}}>
        {messages.map((msg, index) => (
          <li key={index}>
            {msg.author}: {msg.text}
          </li>
        ))}
      </ul>
      <div className="row">
        <label htmlFor="messageInput" className="me-4">Chat</label>
        <input
          id="messageInput"
          autoComplete="off"
          className="w-75"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' ? sendMessage() : null}
        />
        <button id="messageButton" className="w-25" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default SingleChat;
