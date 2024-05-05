import {Route, Routes, useParams} from "react-router-dom";
import React from "react";
import io from 'socket.io-client'
const socket = io.connect("http://localhost:3000")

const SingleChat = () => {
  const {id} = useParams();

  const sendMessage = ()=>{
    socket.emit()
  };

  return (
    <div className="container mt-3">
      <h2>Benvenuto nella chat {id}</h2>

      <ul id="messages"></ul>
      <input id="input" autoComplete="off"/>
      <button id="send" onClick={sendMessage}>Send</button>
    </div>
  );
};

export default SingleChat;
