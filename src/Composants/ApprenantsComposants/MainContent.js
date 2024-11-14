




// // src/components/MainContent.js
// import React from 'react';

// const MainContent = () => {
//     return (
//         <div className="flex-1 p-6 ml-64 bg-gray-100 min-h-screen">
//             {/* Header with Search */}
//             <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-2xl font-bold">Word Sets</h2>
//                 <input type="text" placeholder="Search..." className="border p-2 rounded w-1/3" />
//             </div>

//             {/* Word Sets Cards */}
//             <div className="grid grid-cols-3 gap-4 mb-8">
//                 <div className="p-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg text-white shadow-lg">
//                     <h3 className="font-semibold">Books and Library</h3>
//                 </div>
//                 <div className="p-4 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg text-white shadow-lg">
//                     <h3 className="font-semibold">Books and Library</h3>
//                 </div>
//                 <div className="p-4 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg text-white shadow-lg">
//                     <h3 className="font-semibold">Countries and Cities</h3>
//                 </div>
//                 <div className="p-4 bg-gradient-to-br from-teal-400 to-green-500 rounded-lg text-white shadow-lg">
//                     <h3 className="font-semibold">What is o'clock now?</h3>
//                 </div>
//             </div>

//             {/* Statistics and Quick Start Section */}
//             <div className="grid grid-cols-3 gap-6">
//                 {/* Statistics */}
//                 <div className="col-span-2 bg-white p-6 rounded-lg shadow-lg">
//                     <h3 className="text-xl font-semibold mb-4">Statistics</h3>
//                     <div className="w-full h-32 bg-gray-100 rounded-lg">
//                         {/* Placeholder for the graph/chart */}
//                         <p className="text-center pt-10 text-gray-500">Graph/Chart Placeholder</p>
//                     </div>
//                 </div>

//                 {/* Quick Start */}
//                 <div className="bg-white p-6 rounded-lg shadow-lg">
//                     <h3 className="text-xl font-semibold mb-4">Quick Start</h3>
//                     <div className="space-y-4">
//                         <div className="flex items-center justify-between p-3 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg text-white shadow-lg">
//                             <span>Exam</span>
//                             <span>20 min</span>
//                         </div>
//                         <div className="flex items-center justify-between p-3 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg text-white shadow-lg">
//                             <span>Writing</span>
//                             <span>15 min</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MainContent;


// 1
// // src/components/MainContent.js
// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend,
// } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const MainContent = () => {
//     // Données pour le graphique
//     const data = {
//         labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//         datasets: [
//             {
//                 label: 'Activity',
//                 data: [12, 19, 3, 5, 2, 3, 7],
//                 backgroundColor: 'rgba(75, 192, 192, 0.5)',
//             },
//         ],
//     };

//     const options = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'top',
//             },
//             title: {
//                 display: true,
//                 text: 'Monthly Activity',
//             },
//         },
//     };

//     return (
//         <div className="flex-1 p-6 bg-gray-100">
//             <div className="flex items-center justify-between">
//                 <h2 className="text-2xl font-bold">Word Sets</h2>
//                 <input type="text" placeholder="Search..." className="border p-2 rounded w-1/3" />
//             </div>
//             <div className="grid grid-cols-3 gap-4 mt-4">
//                 <div className="p-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg text-white shadow-lg">
//                     <h3>Books and Library</h3>
//                 </div>
//                 <div className="p-4 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg text-white shadow-lg">
//                     <h3>Countries and Cities</h3>
//                 </div>
//                 <div className="p-4 bg-gradient-to-br from-teal-400 to-green-500 rounded-lg text-white shadow-lg">
//                     <h3>What is o'clock now?</h3>
//                 </div>
//             </div>

//             <h2 className="text-2xl font-bold mt-6">Statistics</h2>
//             <div className="p-6 bg-white rounded-lg shadow-lg mt-4">
//                 <Bar data={data} options={options} />
//             </div>

//             <h2 className="text-2xl font-bold mt-6">Quick Start</h2>
//             <div className="grid grid-cols-1 gap-4 mt-4">
//                 <div className="p-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg text-white shadow-lg">
//                     <p>Exam - 20 min</p>
//                 </div>
//                 <div className="p-4 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg text-white shadow-lg">
//                     <p>Writing - 15 min</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MainContent;




