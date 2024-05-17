import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from "./simple_components/Menu.jsx";
import PaginaPartite from "./page/PaginaPartite.jsx";
import PaginaCampionati from "./page/PaginaCampionati.jsx";
import PaginaClub from "./page/PaginaClub.jsx";
import PaginaGiocatori from "./page/PaginaGiocatori.jsx";
import PaginaMercato from "./page/PaginaMercato.jsx";
import Home from "./page/Home.jsx";
import Login from "./page/Login.jsx";
import GridNews from "./simple_components/GridNews.jsx";
import NewsParams from "./simple_components/NewsParams.jsx";

function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />
        } exact />
        <Route path="/news" element={<GridNews />} />
        <Route path="/news-params" element={<NewsParams />} />
        <Route path="/partite" element={<PaginaPartite />} />
        <Route path="/campionati" element={<PaginaCampionati />} />
        <Route path="/club/:clubId" element={<PaginaClub />} />
        <Route path="/giocatori/:playerId" element={<PaginaGiocatori />} />
        <Route path="/mercato" element={<PaginaMercato />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
