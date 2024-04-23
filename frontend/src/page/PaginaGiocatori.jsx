import React from 'react';
import {useParams} from 'react-router-dom'; // Import useParams hook

import PlayerPres from "../simple_components/PlayerPres.jsx";
import {Line} from 'react-chartjs-2';

import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,
} from 'chart.js';
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const response = await axios.get(`http://localhost:3000/player/goals_date/56416`);
console.log(response.data)
export const options = {};

const labels = response.data.dates

export const data = {
    labels,
    datasets: [{
        label: 'Goals',
        data: response.data.goal_counts,
        borderColor: 'rgb(210,105,30)',
        backgroundColor: 'rgba(210,105,30, 0.5)',
    }],
};

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
                        <Line options={options} data={data}/>
                    </div>
                </div>

                <div className="col-sm-3 ">
                    <PlayerPres name="federico" age="19 gio 1991" position="attaccante" team="juve"/>
                </div>

            </div>
        </div>
    );
}
