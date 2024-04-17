import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from "./simple_components/Menu.jsx";
import PaginaPartite from "./page/PaginaPartite.jsx";
import PaginaCampionati from "./page/PaginaCampionati.jsx";
import PaginaClub from "./page/PaginaClub.jsx";
import PaginaGiocatori from "./page/PaginaGiocatori.jsx";
import PaginaMercato from "./page/PaginaMercato.jsx";
import PaginaNews from "./page/PaginaNews.jsx";
import Home from "./page/Home.jsx";
import Login from "./page/Login.jsx";

function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />
        } exact />
        <Route path="/news" element={<PaginaNews />} />
        <Route path="/partite" element={<PaginaPartite />} />
        <Route path="/campionati" element={<PaginaCampionati />} />
        <Route path="/club" element={<PaginaClub />} />
        <Route path="/giocatori" element={<PaginaGiocatori />} />
        <Route path="/mercato" element={<PaginaMercato />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
