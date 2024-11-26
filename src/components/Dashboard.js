import React from 'react';
import CaloriesChart from './CaloriesChart';
import HabitTracker from './HabitTracker';
import Activity from './Activity';
import DailyProgress from './DailyProgress';
import Meditation from './Meditation';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <CaloriesChart />
      <HabitTracker />
      <Activity />
      <DailyProgress />
      <Meditation />
    </div>
  );
}

export default Dashboard;
