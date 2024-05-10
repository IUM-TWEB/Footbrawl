import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import io from "socket.io-client";

const SingleChat = () => {
  const {id: currentRoom} = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  //prendere il nome dai dati di login
  const myName = "login";

  useEffect(() => {
    const socket = io("http://localhost:3000");
    setSocket(socket);

    socket.emit('create or join', currentRoom, myName);
    const joinMessage = {text: ` has joined the conversation`, author: `Me`};
    setMessages(prevMessages => [...prevMessages, joinMessage]);
    //localStorage.setItem('room', currentRoom);

    socket.on('create or join', (name) => {
      if (name !== myName) {
        const joinMessage = {text: ` has joined the conversation`, author: `${name}`};
        setMessages(prevMessages => [...prevMessages, joinMessage]);
      }
    });

    socket.on('chat message', (msg, name) => {
      name = msg;
      const newMessage = {text: msg, author: name === myName ? "Me" : name};
      setMessages(prevMessages => [...prevMessages, newMessage]);
    });

    socket.on('leave conversation', (name) => {
      const newMessage = {text: ' has left the conversation', author: `${name}`};
      setMessages(prevMessages => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off('chat message');
      socket.off('create or join');
    };
  }, [currentRoom]);

  const sendMessage = () => {
    if (message && socket) {
      console.log(message);
      socket.emit('chat message', currentRoom, message, myName);
      setMessages(prevMessages => [...prevMessages, {text: message, author: "Me"}]);
      setMessage('');
    }
  };

  const logout = () => {
    localStorage.clear();
    if (socket) {
      socket.emit('leave conversation', currentRoom, myName);
      socket.close();
    }
    navigate(-1);
  };

  return (
    <div className="container mt-5 w-100 min-height-75" id="message_container">
      <div className="row mb-2">
        <h2 className="col-md-10">Benvenuto nella chat {currentRoom}</h2>
        <button
          id="logout"
          className="btn btn-small btn-danger col-md-2"
          aria-label="logout"
          onClick={logout}>Logout
        </button>
      </div>

      <ul id="messages" className="bg-custom list-unstyled shadow p-3">
        {messages.map((msg, index) => (
          <li key={index} className="message-item">
            <strong>{msg.author}</strong>: {msg.text}
          </li>
        ))}
      </ul>

      <div className="row align-items-center">
        <div className="col-md-9 pe-2">
          <input
            id="messageInput"
            autoComplete="off"
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' ? sendMessage() : null}
            placeholder="Scrivi un messaggio qui..."
          />
        </div>
        <div className="col-md-3">
          <button
            aria-label="send message"
            id="messageButton"
            className="btn btn-primary w-100"
            onClick={sendMessage}>Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleChat;
