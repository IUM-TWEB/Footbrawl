import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlayerPres from "../simple_components/PlayerPres.jsx";
import PlayerClubs from "../simple_components/PlayerClubs.jsx";
import { Line } from 'react-chartjs-2';
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
            console.log("Returning null: ", endpoint);
            return null;
        }
    } catch (error) {
        console.error(`Error fetching ${endpoint} data:`, error);
        return null;
    }
}

function show_graph(data) {
    if (data) {
        return <Line options={options} data={data} />;
    } else {
        return;
    }
}

function show_info(player, player_id) {
    if (player) {
        return (
            <PlayerPres
                name={player.name}
                data={player.dateOfBirth}
                position={player.position}
                img={player.imageUrl}
                team={player.currentClubName}
                hight={player.heightInCm}
                lastSeason={player.lastSeason}
                playerId={player_id}
            />
        );
    }
}

export default function PaginaGiocatori() {
    const { playerId } = useParams();
    const [chartGoalData, setChartGoalData] = useState(null);
    const [playerClubs, setPlayerClubs] = useState(null);
    const [chartMarket, setChartMarket] = useState(null);
    const [player, setPlayer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [playerClubs, playerData, goalsChartData, assistsChartData, marketValueChartData] = await Promise.all([
                    axios.get(`http://localhost:3000/player/player_clubs/${playerId}`),
                    axios.get(`http://localhost:3000/player/${playerId}`),
                    getChartData(playerId, 'goals_date', 'goals'),
                    getChartData(playerId, 'assist_date', 'assists'),
                    getChartData(playerId, 'market_value', 'market value')
                ]);

                if (assistsChartData) {
                    goalsChartData.datasets.push(assistsChartData.datasets);
                }

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
                <div className="col-sm-3 p-3"> <PlayerClubs playerInfo={playerClubs}></PlayerClubs></div>
            </div>
        </div>
    );
}
