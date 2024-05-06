import React, { useState } from 'react';
import SearchBar from "../simple_components/SearchBar.jsx";
import LeaderBoard from "../simple_components/LeaderBoard.jsx";
import News from "../simple_components/News.jsx";

const Home = () => {
  const [isOpaque, setIsOpaque] = useState(false);  // Proper state declaration for opacity

  const toggleOpacity = (opacity) => {
    setIsOpaque(opacity); // Correctly sets the opacity based on passed boolean value
  };

  return (
    <>
      <SearchBar setOpacity={toggleOpacity} />
      <div className="padding home"></div>
      <div className="container-fluid padding" style={{ opacity: isOpaque ? 0.2 : 1 }}>
        <div className="row justify-content-md-center">
          <div className="col-md-3">
            <LeaderBoard className="leaderboard" competitions="serie A" first="Milan" second="juventus" third="Inter" firstValue="11" secondValue="16" thirdValue="21" />
            <LeaderBoard className="leaderboard" competitions="serie B" first="Milan" second="juventus" third="Inter" firstValue="11" secondValue="16" thirdValue="21" />
            <LeaderBoard className="leaderboard" competitions="serie C" first="Milan" second="juventus" third="Inter" firstValue="11" secondValue="16" thirdValue="21" />
          </div>
          <div className="col-md-6">
            <News />
            <News />
            <News />
          </div>
          <div className="col-md-3">
            <LeaderBoard className="leaderboard" competitions="serie D" first="Milan" second="juventus" third="Inter" firstValue="11" secondValue="16" thirdValue="21" />
            <LeaderBoard className="leaderboard" competitions="serie D" first="Milan" second="juventus" third="Inter" firstValue="11" secondValue="16" thirdValue="21" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
