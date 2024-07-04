import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import PlayerPres from "../simple_components/PlayerPres.jsx";
import PlayerClubs from "../simple_components/PlayerClubs.jsx";
import {Line} from 'react-chartjs-2';
import axios from "axios";
import {useAuth} from '../context/AuthContext';



import {// Import chart.js components
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

// Recuperiamo i dati da mostrare nei due grafici
async function getChartData(player_id, endpoint, label_name) {
  try {
    const response = await axios.get(`http://localhost:3000/player/${endpoint}/${player_id}`);

    if (response && response.data && response.data.dates.length >= 5) { // I dati sono mostrati solamente se ci sono e sono sufficienti
      const labels = response.data.dates;
      const data = response.data.goal_counts;
      // ritorniamo in un formato che possa essere letto da chartjs
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

function show_graph(data, type) {
  if (data) {
    return <Line options={options} data={data}/>;
  } else {
    return <p className="h3 mt-5 text-center d-flex justify-content-center">Non ci sono abbastanza dati sui {type} del giocatore</p>;
  }
}
// Mostriamo i dati relativi al giocatore
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
  const {username} = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Recuperiamo tutti i dati
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
        setLoading(false); // Terminiamo l'animazione di loading

      } catch (error) {
        console.error('Error fetching chart data:', error);
        setLoading(false); // Terminiamo l'animazione di loading
      }
    };

    // Controlliamo se il parametro playerId è disponibile
    if (playerId) {
      fetchData();
    }
  }, [playerId]);
  // Per l'animazione di loading
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  const handleChatClick = (nameRoom) => {
    if (username) {
      navigate(`/chat/${nameRoom}`);
    } else {
      navigate('/login'); // se username non è disponibile, l'utente si deve loggare
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-3 p-3">{show_info(player, playerId)}</div>
        <div className="col-sm-6">
          <div className={"m-3"}>
            <div>{show_graph(chartGoalData, "goal")}</div>
          </div>
          <div className={"m-3"}>
            <div>{show_graph(chartMarket, "valori di mercato")}</div>
          </div>
        </div>
        <div className="col-sm-3 p-3">
          <div className="mb-5">
            <PlayerClubs playerClubs={playerClubs}></PlayerClubs>
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
