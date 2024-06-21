import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Menu from "./simple_components/Menu.jsx";
import PaginaCampionati from "./page/PaginaCampionati.jsx";
import PaginaClub from "./page/PaginaClub.jsx";
import PaginaGiocatori from "./page/PaginaGiocatori.jsx";
import Home from "./page/Home.jsx";
import Login from "./page/Login.jsx";
import GridNews from "./simple_components/GridNews.jsx";
import NewsParams from "./simple_components/NewsParams.jsx";
import PaginaChat from "./page/PaginaChat.jsx";
import SingleChat from "./simple_components/SingleChat.jsx"
import Register from "./page/Registrazione.jsx";
import PaginaUser from "./page/PaginaUser.jsx";
import ProtectedRoute from './simple_components/ProtectedRoute.jsx';
import PaginaCampionato from "./page/PaginaCampionato.jsx";

function App() {
  return (
    <Router>
      <Menu/>
      <Routes>
        <Route path="/" element={<Home/>
        } exact/>

        <Route path="/reg" element={<Register/>}/>
        <Route path="/chat" element={<ProtectedRoute> <PaginaChat/> </ProtectedRoute>}/>
        <Route path="/chat/:id" element={<ProtectedRoute> <SingleChat/> </ProtectedRoute>}/>
        <Route path="/paginauser" element={<ProtectedRoute> <PaginaUser/> </ProtectedRoute>}/>
        <Route path="/news" element={<GridNews/>}/>
        <Route path="/news-params" element={<NewsParams />} />
        <Route path="/campionati" element={<PaginaCampionati />} />
        <Route path="/campionati/:id_campionato" element={<PaginaCampionato />} />
        <Route path="/club/:clubId" element={<PaginaClub />} />
        <Route path="/giocatori/:playerId" element={<PaginaGiocatori />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<PaginaChat />} />
        <Route path="/chat/:id" element={<SingleChat />} />

      </Routes>
    </Router>
  );
}

export default App;
