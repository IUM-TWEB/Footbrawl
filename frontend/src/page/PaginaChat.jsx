import React from 'react';
import {Route, Routes, Link, useParams} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const PaginaChat = () => {
  const chats = [
    {id: 1, title: 'Chat Generale'},
    {id: 2, title: 'Chat di Progetto'},
    {id: 3, title: 'Chat Privata'}
  ];

  return (
    <div className="container mt-3">
      <h1>Ciao, seleziona una chat</h1>
      <div className="d-flex flex-column">
        {chats.map(chat => (
          <Link key={chat.id} to={`/chat/${chat.id}`} className="btn btn-primary mb-2">
            {chat.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PaginaChat;
