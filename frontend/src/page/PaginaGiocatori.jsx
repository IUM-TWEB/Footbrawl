import React from 'react';
import {useParams} from 'react-router-dom'; // Import useParams hook
import PlayerPres from "../simple_components/PlayerPres.jsx";
import {Line} from 'react-chartjs-2';

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
import axios from "axios";

export const options = {};


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function getChartData(player_id) {
    let goals_stats = 0
    let assist_stats = 0
    axios.get(`http://localhost:3000/player/goals_date/${player_id}`)
        .then(res => {
            goals_stats = res
        })
        .catch(err => {
            goals_stats = null
        })
    axios.get(`http://localhost:3000/player/assist_date/${player_id}`)
        .then(res => {
            assist_stats = res
        })
        .catch(err => {
            assist_stats = null
        })

    if (goals_stats  && assist_stats) {
        console.log("siamo qui")
        const labels = goals_stats.data.dates

        return {
            labels,
            datasets: [
                {
                    label: 'Goals',
                    data: goals_stats.data.goal_counts,
                    borderColor: 'rgb(210,105,30)',
                    backgroundColor: 'rgba(210,105,30, 1)',
                },
                {
                    label: 'Assists',
                    data: assist_stats.data.goal_counts,
                    borderColor: 'rgba(210,105,30, 0.5)',
                    backgroundColor: 'rgba(210,105,30, 0.5)',
                }],
        };
    } else return null

}

const data = getChartData(36500)
function show_graph(data){
    if(data){
        return  <Line options={options} data={data}/>
    }else{
        return <h1>Somethings gone wrong</h1>
    }
}

export default function PaginaGiocatori() {
    // Use useParams hook to access parameters from URL
    const {player_id} = useParams();

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-3">
                    {/* Use parameters from URL */}
                    <PlayerPres name={player_id} age={"330"} position={"playerPosition"} team={"plarTeam"}/>
                </div>

                <div className="col-sm-6">
                    <div className="col chart-container">
                        {show_graph(data)}
                    </div>
                </div>

                <div className="col-sm-3 ">
                    <PlayerPres name="federico" age="19 gio 1991" position="attaccante" team="juve"/>
                </div>

            </div>
        </div>
    );
}
