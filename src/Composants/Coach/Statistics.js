import React from 'react';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);
function Statistics({ domainData, courseData }) {
    const data = {
        labels: [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
        ],
        datasets: [
            {
                label: 'Nombre de Domaines',
                data: domainData,
                backgroundColor: 'rgba(255, 102, 255, 0.5)',
                borderColor: 'rgba(255, 102, 255, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
        },
        scales: {
            x: { grid: { display: false } },
            y: { beginAtZero: true },
        },
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl text-blue-600 font-bold mb-4">Statistiques des Domaines</h2>
            <Line data={data} options={options} />
        </div>
    );
}
export default Statistics;
