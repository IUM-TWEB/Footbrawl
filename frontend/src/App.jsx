import React from 'react';
import {useState, useEffect,} from "react";
import LeaderBoard from './LeaderBoard.jsx';
import Menu from "./Menu.jsx";
import News from "./News.jsx";
import axios from "axios";
import SearchBar from "./SearchBar.jsx";

const apiCall = () => {
  axios.get('http://localhost:3000/test2').then((data) => {
    //this console.log will be in our frontend console
    console.log(data)
  })
    .catch(e => {
      console.log(e)
    })
}

function App() {
  return (
    <>
      <Menu></Menu>
      <SearchBar></SearchBar>

      <div className="padding"></div>
      <div className="container-fluid padding">
        <div className="row justify-content-md-center">
          <div className="col-md-3">
            <LeaderBoard class="leaderboard"
                         competitions="serie A"
                         first="Milan"
                         second="juventus"
                         third="Inter"
                         firstValue="11"
                         secondValue="16"
                         thirdValue="21"
            ></LeaderBoard>
            <LeaderBoard class="leaderboard"
                         competitions="serie B"
                         first="Milan"
                         second="juventus"
                         third="Inter"
                         firstValue="11"
                         secondValue="16"
                         thirdValue="21"
            ></LeaderBoard>
            <LeaderBoard class="leaderboard"
                         competitions="serie C"
                         first="Milan"
                         second="juventus"
                         third="Inter"
                         firstValue="11"
                         secondValue="16"
                         thirdValue="21"
            ></LeaderBoard>
          </div>
          <div className="col-md-6">
            <News></News>
            <News></News>
            <News></News>
          </div>
          <div className="col-md-3">
            <LeaderBoard class="leaderboard"
                         competitions="serie D"
                         first="Milan"
                         second="juventus"
                         third="Inter"
                         firstValue="11"
                         secondValue="16"
                         thirdValue="21"
            ></LeaderBoard>

          </div>
        </div>
      </div>

      <p>bottone di prova per testare la connessione al server</p>
      <button onClick={apiCall}>Make API Call</button>
    </>
  );
}

export default App;

