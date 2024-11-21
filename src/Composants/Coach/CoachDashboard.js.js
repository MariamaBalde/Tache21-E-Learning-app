import React from "react";
import { Link } from "react-router-dom";

const CoachDashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Coach Dashboard</h1>
      <nav className="my-4 space-x-4">
        <Link to="/coach/domains" className="text-blue-500">Domains</Link>
        <Link to="/coach/subdomains" className="text-blue-500">Subdomains</Link>
        <Link to="/coach/courses" className="text-blue-500">Courses</Link>
        <Link to="/coach/quizzes" className="text-blue-500">Quizzes</Link>
        <Link to="/coach/projects" className="text-blue-500">Projects</Link>
      </nav>
    </div>
  );
};

export default CoachDashboard;

