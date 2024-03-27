import React from 'react';
import {useState, useEffect,} from "react";
import LeaderBoard from './LeaderBoard.jsx';
import Menu from "./Menu.jsx";
import News from "./News.jsx";
import axios from "axios";
import SearchBar from "./SearchBar.jsx";

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
    </>
  );
}

export default App;

