import React from 'react';
import {Route, Routes, Link, useParams} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const PaginaChat = () => {
  const chats = [
    {nameRoom: 'Chat Generale', title: 'Chat Generale'},
    {nameRoom: 2, title: 'Chat di Progetto'},
    {nameRoom: 3, title: 'Chat Privata'}
  ];

  return (
    <div className="container mt-3">
      <h1>Ciao, seleziona una chat</h1>
      <div className="d-flex flex-column">
        {chats.map(chat => (
          <Link key={chat.nameRoom} to={`/chat/${chat.nameRoom}`} className="btn btn-primary mb-2">
            {chat.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PaginaChat;
