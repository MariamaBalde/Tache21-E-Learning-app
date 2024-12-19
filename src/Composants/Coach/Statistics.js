
// import React from 'react';
// import {
//     Chart as ChartJS,
//     LineElement,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     Tooltip,
//     Legend,
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';
// ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);
// function Statistics({ domainData, courseData }) {
//     const data = {
//         labels: [
//             'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
//             'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
//         ],
//         datasets: [
//             {
//                 label: 'Nombre de Domaines',
//                 data: domainData,
//                 backgroundColor: 'rgba(255, 102, 255, 0.5)',
//                 borderColor: 'rgba(255, 102, 255, 1)',
//                 borderWidth: 2,
//                 tension: 0.4,
//                 fill: true,
//             },
//             {
//                 label: 'Nombre de Cours',
//                 data: courseData,
//                 backgroundColor: 'rgba(59, 130, 246, 0.5)',
//                 borderColor: 'rgba(59, 130, 246, 1)',
//                 borderWidth: 2,
//                 tension: 0.4,
//                 fill: true,
//             },
//         ],
//     };

//     const options = {
//         responsive: true,
//         plugins: {
//             legend: { position: 'top' },
//         },
//         scales: {
//             x: { grid: { display: false } },
//             y: { beginAtZero: true },
//         },
//     };

//     return (
//         <div className="bg-white p-6 rounded-lg shadow">
//             <h2 className="text-xl text-blue-600 font-bold mb-4">Statistiques des Domaines et Cours</h2>
//             <Line data={data} options={options} />
//         </div>
//     );
// }
// export default Statistics;

// import React from 'react';
// import {
//     Chart as ChartJS,
//     LineElement,
//     CategoryScale, // Pour l'axe des catégories (x)
//     LinearScale,   // Pour l'axe des valeurs (y)
//     PointElement,
//     Tooltip,
//     Legend
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';
// ChartJS.register(
//     LineElement,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     Tooltip,
//     Legend
// );
// function Statistics() {
//     const data = {
//         labels: [
//             'January',
//             'February',
//             'March',
//             'April',
//             'May',
//             'June',
//             'July',
//             'August',
//             'September',
//             'October',
//             'November',
//             'December',
//         ],
//         datasets: [
//             {
//                 label: 'Cours Complétés',
//                 data: [3, 5, 2, 8, 6, 9, 7, 4, 6, 8, 10, 12],
//                 backgroundColor: 'rgba(59, 130, 246, 0.5)',
//                 borderColor: 'rgba(59, 130, 246, 1)',
//                 borderWidth: 2,
//                 tension: 0.4,
//                 fill:true,
//             },
//             {
//                 label: 'Projets Validés',
//                 data: [1, 3, 4, 5, 7, 6, 8, 5, 9, 7, 6, 11],
//                 backgroundColor: 'rgba(255, 102, 255, 0.5)',
//                 borderColor: 'rgba(255, 102, 255, 1)',
//                 borderWidth: 2,
//                 tension: 0.4,
//                 fill: true,
//             },
//         ],
//     };

//     const options = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'top',
//             },
//         },
//         scales: {
//             x: {
//                 grid: {
//                     display: false,
//                 },
//             },
//             y: {
//                 beginAtZero: true,
//             },
//         },
//     };

//     return (
//         <div className="bg-white p-6 rounded-lg shadow">
//             <h2 className="text-xl text-blue-600 font-bold mb-4">Statistics</h2>
//             <Line data={data} options={options} />
//         </div>
//     );
// }
// export default Statistics;

// 2
// import React from 'react';
// import {
//     Chart as ChartJS,
//     LineElement,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     Tooltip,
//     Legend,
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';
// ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

// function Statistics({ domainData, courseData }) {
//     const data = {
//         labels: [
//             'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
//             'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
//         ],
//         datasets: [
//             {
//                 label: 'Nombre de Domaines',
//                 data: domainData,
//                 backgroundColor: 'rgba(255, 102, 255, 0.5)',
//                 borderColor: 'rgba(255, 102, 255, 1)',
//                 borderWidth: 2,
//                 tension: 0.4,
//                 fill: true,
//             },
//             {
//                 label: 'Nombre de Cours',
//                 data: courseData,
//                 backgroundColor: 'rgba(59, 130, 246, 0.5)',
//                 borderColor: 'rgba(59, 130, 246, 1)',
//                 borderWidth: 2,
//                 tension: 0.4,
//                 fill: true,
//             },
//         ],
//     };

//     const options = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'top',
//             },
//         },
//         scales: {
//             x: {
//                 grid: {
//                     display: false,
//                 },
//             },
//             y: {
//                 beginAtZero: true,
//             },
//         },
//     };

//     return (
//         <div className="bg-white p-6 rounded-lg shadow">
//             <h2 className="text-xl text-blue-600 font-bold mb-4">Statistiques des Domaines et Cours</h2>
//             <Line data={data} options={options} />
//         </div>
//     );
// }
// export default Statistics;
// 2
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
            // {
            //     label: 'Nombre de Cours',
            //     data: courseData,
            //     backgroundColor: 'rgba(59, 130, 246, 0.5)',
            //     borderColor: 'rgba(59, 130, 246, 1)',
            //     borderWidth: 2,
            //     tension: 0.4,
            //     fill: true,
            // },
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
