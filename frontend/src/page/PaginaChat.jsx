import React from 'react';
import {useNavigate} from 'react-router-dom';


const PaginaChat = () => {
  const chats = [
    {nameRoom: 'Chat Generale', title: 'Chat Generale'},
    {nameRoom: 2, title: 'Chat di Progetto'},
    {nameRoom: 3, title: 'Chat Privata'}
  ];

  const navigate = useNavigate();

  const handleChatClick = (nameRoom) => {
    if (localStorage.getItem("username")) {
      navigate(`/chat/${nameRoom}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="container mt-3">
      <h1>Ciao, seleziona una chat</h1>
      <div className="d-flex flex-column">
        {chats.map(chat => (
          <button
            key={chat.nameRoom}
            onClick={() => handleChatClick(chat.nameRoom)}
            aria-label="chat button"
            className="btn btn-primary mb-2"
          >
            {chat.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaginaChat;
