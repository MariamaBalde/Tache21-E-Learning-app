import React from 'react';
import GradientCard from './GradientCard';
import { Users, FileText, CheckSquare } from 'lucide-react';
import Statistics from './Statistics';
import QuickStart from './QuickStart';

const Dashboard = () => {
    return (
        <main className="p-6">
            <h2 className="text-xl text-sky-950 font-bold mb-4">Word Sets</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <GradientCard
                    title="Etudiants Coachés"
                    icon={Users}
                    gradient="bg-gradient-to-br from-blue-600 to-blue-300"
                />
                <GradientCard
                    title="Syllabus créés"
                    icon={FileText}
                    gradient="bg-gradient-to-br from-blue-300 to-[#FF66FF]"
                />
                <GradientCard
                    title="Taches Validées"
                    icon={CheckSquare}
                    gradient="bg-gradient-to-br from-white to-blue-800"
                />
            </div>

            <section className="mt-8 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Statistics prend 2 colonnes sur les écrans larges */}
                <div className="lg:col-span-2">
                    <Statistics />
                </div>

                {/* QuickStart prend 1 colonne */}
                <div className="lg:col-span-1">
                    <QuickStart />
                </div>
            </section>
        </main>
    );
};

export default Dashboard;



// // components/MainContent.js
// import React from "react";
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// // Enregistrement des composants nécessaires de Chart.js
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function Dashboard() {
//   // Données pour les deux courbes (bleue et marron)
//   const data = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//     datasets: [
//       {
//         label: 'Progression Bleue',
//         data: [65, 59, 80, 81, 56, 55, 40, 44, 50, 60, 63, 75],
//         fill: true,
//         backgroundColor: 'rgba(75, 192, 192, 0.4)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 3,
//         tension: 0.4,
//         pointBackgroundColor: 'rgba(75, 192, 192, 1)',
//         pointBorderColor: '#fff',
//         pointBorderWidth: 2,
//         pointRadius: 6,
//         pointHoverRadius: 8,
//         pointHoverBackgroundColor: 'rgba(75, 192, 192, 0.7)',
//         pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
//       },
//       {
//         label: 'Progression Marron',
//         data: [60, 55, 72, 78, 52, 50, 38, 42, 4.5, 58, 62, 73],
//         fill: true,
//         backgroundColor: 'rgba(153, 101, 21, 0.3)',
//         borderColor: 'rgba(153, 101, 21, 1)',
//         borderWidth: 3,
//         tension: 0.4,
//         pointBackgroundColor: 'rgba(153, 101, 21, 1)',
//         pointBorderColor: '#fff',
//         pointBorderWidth: 2,
//         pointRadius: 6,
//         pointHoverRadius: 8,
//         pointHoverBackgroundColor: 'rgba(153, 101, 21, 0.7)',
//         pointHoverBorderColor: 'rgba(153, 101, 21, 1)',
//       },
//     ],
//   };

//   // Options de configuration pour le graphique
//   const options = {
//     responsive: true,
//     scales: {
//       y: {
//         beginAtZero: true,
//         grid: {
//           borderColor: '#e3e3e3',
//         },
//       },
//       x: {
//         grid: {
//           borderColor: '#e3e3e3',
//         },
//       },
//     },
//     plugins: {
//       tooltip: {
//         backgroundColor: '#333',
//         titleColor: '#fff',
//         bodyColor: '#fff',
//         borderColor: '#e3e3e3',
//         borderWidth: 1,
//       },
//     },
//     elements: {
//       line: {
//         tension: 0.4,
//       },
//     },
//   };

//   return (
//     <div className="p-6">
//       {/* Main Content */}
//       <main className="flex-1 p-0 overflow-hidden">
//         {/* Ensembles de mots */}
//         <section className="mb-8">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold">Ensembles de mots</h2>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//             <WordSetCard
//               title="Livres et bibliothèque"
//               gradient="from-purple-400 to-pink-500"
//               icon="📚"
//             />
//             <WordSetCard
//               title="Pays et villes"
//               gradient="from-purple-400 to-indigo-500"
//               icon="🌍"
//             />
//             <WordSetCard
//               title="Quelle heure est-il maintenant ?"
//               gradient="from-cyan-400 to-blue-500"
//               icon="🕰️"
//             />
//           </div>
//         </section>

//         {/* Statistiques et Démarrage rapide côte à côte */}
//         <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8">
//           {/* Statistiques */}
//           <div className="col-span-12 md:col-span-8">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-2xl font-bold">Statistiques</h2>
//               <div className="flex items-center space-x-2">
//                 <button className="p-2">
//                   <ChevronLeft className="h-5 w-5 text-gray-600" />
//                 </button>
//                 <span className="font-semibold">2024</span>
//                 <button className="p-2">
//                   <ChevronRight className="h-5 w-5 text-gray-600" />
//                 </button>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg p-4 shadow">
//               {/* Ici, on s'assure que le graphique a la même largeur que l'input */}
//               <div className="relative w-full max-w-lg sm:h-80 md:h-96 overflow-hidden">
//                 <Line data={data} options={options} />
//               </div>
//             </div>
//           </div>

//           {/* Démarrage rapide */}
//           <div className="col-span-12 md:col-span-4">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-2xl font-bold">Démarrage rapide</h2>
//             </div>
//             <div className="space-y-4">
//               <QuickStartCard title="Examen" duration="20 min" icon="🎓" />
//               <QuickStartCard title="Écriture" duration="15 min" icon="✍️" />
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }

// // Composants supplémentaires (WordSetCard, QuickStartCard)
// function WordSetCard({ title, gradient, icon }) {
//   return (
//     <div className={`p-6 rounded-lg shadow-lg bg-gradient-to-r ${gradient}`}>
//       <div className="text-3xl">{icon}</div>
//       <h3 className="text-lg font-semibold mt-2">{title}</h3>
//     </div>
//   );
// }

// function QuickStartCard({ title, duration, icon }) {
//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md">
//       <div className="flex items-center space-x-2">
//         <div className="text-3xl bg-gradient-to-r from-blue-500 to-indigo-600 p-3 text-white">
//           {icon}
//         </div>
//         <div>
//           <h4 className="text-lg font-semibold">{title}</h4>
//           <p className="text-sm text-gray-600">{duration}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;


