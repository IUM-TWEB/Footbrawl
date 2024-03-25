import React from 'react';
import {useState, useEffect,} from "react";
import Leaderboard from './Leaderboard';
import Menu from "./Menu.jsx";
import News from "./News.jsx";
import SearchForm from "./SearchForm.jsx";
import axios from "axios";
import Prova from "./Prova.jsx";


const apiCall = () => {
  axios.get('http://localhost:3000/test').then((data) => {
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

      <Prova></Prova>
      {/*
      <Menu></Menu>
      <div className="padding"></div>
      <div className="divSearchForm">
      <SearchForm></SearchForm></div>
      <div className="container-fluid padding">
        <div className="row justify-content-md-center">
          <div className="col-md-3">
            <Leaderboard class="leaderboard"
                         competitions="serie A"
                         first="Milan"
                         second="juventus"
                         third="Inter"
                         firstValue="11"
                         secondValue="16"
                         thirdValue="21"
            ></Leaderboard>
            <Leaderboard class="leaderboard"
                         competitions="serie A"
                         first="Milan"
                         second="juventus"
                         third="Inter"
                         firstValue="11"
                         secondValue="16"
                         thirdValue="21"
            ></Leaderboard>
            <Leaderboard class="leaderboard"
                         competitions="serie A"
                         first="Milan"
                         second="juventus"
                         third="Inter"
                         firstValue="11"
                         secondValue="16"
                         thirdValue="21"
            ></Leaderboard>
          </div>

          <div className="col-md-6">

            <News></News>
            <News></News>
            <News></News>
          </div>
          <div className="col-md-3">
            <Leaderboard class="leaderboard"
                         competitions="serie A"
                         first="Milan"
                         second="juventus"
                         third="Inter"
                         firstValue="11"
                         secondValue="16"
                         thirdValue="21"
            ></Leaderboard>


          </div>
        </div>
      </div>
      <p>bottone di prova per testare la connessione al server</p>
      <button onClick={apiCall}>Make API Call</button>
      */}


    </>
  );
}

export default App;

