import React from 'react';
import PlayerPres from "../simple_components/PlayerPres.jsx";
import {Line} from 'react-chartjs-2';

import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {};

const labels = [2011, 2012, 2013, 2014, 2015, 2016, 2017,2018,2019];

export const data = {
    labels, datasets: [{
        label: 'Goals', data: [23, 33, 103, 99, 124, 56, 44,22,44], borderColor: 'rgb(210,105,30)', backgroundColor: 'rgba(210,105,30, 0.5)',
    },],
};

export default function PaginaGiocatori() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-3">
                    <PlayerPres name="Davide" age="19 gio 1991" position="attaccante" team="Milan"/>
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


