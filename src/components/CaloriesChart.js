import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function CaloriesChart() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Calories',
        data: [500, 700, 1000, 800, 1200, 900, 1300, 1500, 1200, 900, 600, 1100],
        backgroundColor: '#FBC02D',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Calories per Month',
      },
    },
  };

  return (
    <div className="card">
      <h2>Calories</h2>
      <Bar key={Math.random()} data={data} options={options} />

    </div>
  );
}

export default CaloriesChart;
