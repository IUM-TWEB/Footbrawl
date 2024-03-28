import React from 'react';
import SearchBar from "../simple_components/SearchBar.jsx";
import LeaderBoard from "../simple_components/LeaderBoard.jsx";
import News from "../simple_components/News.jsx";

const Home= () => {
  return (
    <>
      <SearchBar />
      <div className="padding"></div>
      <div className="container-fluid padding">
        <div className="row justify-content-md-center">
          <div className="col-md-3">
            <LeaderBoard class="leaderboard" competitions="serie A" first="Milan" second="juventus" third="Inter" firstValue="11" secondValue="16" thirdValue="21" />
            <LeaderBoard class="leaderboard" competitions="serie B" first="Milan" second="juventus" third="Inter" firstValue="11" secondValue="16" thirdValue="21" />
            <LeaderBoard class="leaderboard" competitions="serie C" first="Milan" second="juventus" third="Inter" firstValue="11" secondValue="16" thirdValue="21" />
          </div>
          <div className="col-md-6">
            <News />
            <News />
            <News />
          </div>
          <div className="col-md-3">
            <LeaderBoard class="leaderboard" competitions="serie D" first="Milan" second="juventus" third="Inter" firstValue="11" secondValue="16" thirdValue="21" />
            <LeaderBoard class="leaderboard" competitions="serie D" first="Milan" second="juventus" third="Inter" firstValue="11" secondValue="16" thirdValue="21" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
