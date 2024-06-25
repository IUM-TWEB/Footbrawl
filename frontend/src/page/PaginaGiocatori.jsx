import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import PlayerPres from "../simple_components/PlayerPres.jsx";
import PlayerClubs from "../simple_components/PlayerClubs.jsx";
import {Line} from 'react-chartjs-2';
import axios from "axios";

// Import chart.js components
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {};

async function getChartData(player_id, endpoint, label_name) {
  try {
    const response = await axios.get(`http://localhost:3000/player/${endpoint}/${player_id}`);

    if (response && response.data && response.data.dates.length >= 5) {
      const labels = response.data.dates;
      const data = response.data.goal_counts;

      return {
        labels,
        datasets: [{
          label: label_name,
          data,
          borderColor: 'rgb(210,105,30)',
          backgroundColor: 'rgba(210,105,30, 1)',
        }],
      };
    } else {
      const labels = [];
      const data = [];

      return {
        labels,
        datasets: [{
          label: `No ${label_name} data`,
          data,
          borderColor: 'rgb(210,105,30)',
          backgroundColor: 'rgba(210,105,30, 1)',
        }],
      };
    }
  } catch (error) {
    console.error(`Error fetching ${endpoint} data:`, error);
    return null;
  }
}

function show_graph(data) {
  if (data) {
    return <Line options={options} data={data}/>;
  } else {
    return <p className="h3 d-flex justify-content-center">Non ci sono abbastanza dati sul giocatore</p>;
  }
}

function show_info(player, player_id) {
  if (player) {
    return (
      <PlayerPres
        name={player.name}
        data={player.dateOfBirth}
        età={player.age}
        nazionalità={player.countryOfBirth}
        position={player.position}
        img={player.imageUrl}
        team={player.currentClubName}
        teamId={player.currentClubId}
        hight={player.heightInCm}
        lastSeason={player.lastSeason}
        foot={player.foot}
        playerId={player_id}
      />
    );
  }
}

export default function PaginaGiocatori() {
  const {playerId} = useParams();
  const [chartGoalData, setChartGoalData] = useState(null);
  const [playerClubs, setPlayerClubs] = useState(null);
  const [chartMarket, setChartMarket] = useState(null);
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [playerClubs, playerData, goalsChartData, marketValueChartData] = await Promise.all([
          axios.get(`http://localhost:3000/player/player_clubs/${playerId}`),
          axios.get(`http://localhost:3000/player/${playerId}`),
          getChartData(playerId, 'goals_date', 'goals'),
          getChartData(playerId, 'market_value', 'market value')
        ]);

        setPlayerClubs(playerClubs.data.clubs)
        setPlayer(playerData.data);
        setChartGoalData(goalsChartData);
        setChartMarket(marketValueChartData);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    // Check if player_id is available
    if (playerId) {
      fetchData();
    }
  }, [playerId]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  const handleChatClick = (nameRoom) => {
    if (localStorage.getItem("username")) {
      navigate(`/chat/${nameRoom}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-3 p-3">{show_info(player, playerId)}</div>
        <div className="col-sm-6">
          <div className={"m-3"}>
            <div>{show_graph(chartGoalData)}</div>
          </div>
          <div className={"m-3"}>
            <div>{show_graph(chartMarket)}</div>
          </div>
        </div>
        <div className="col-sm-3 p-3">
          <div className="mb-5">
            <PlayerClubs playerInfo={playerClubs}></PlayerClubs>
          </div>
          <div className="d-flex justify-content-center">
            <button
              key={player.name}
              onClick={() => handleChatClick(player.name)}
              aria-label="chat button"
              className="btn btn-primary mb-2"
            >
              {"Unisciti alla chat di " + player.name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
