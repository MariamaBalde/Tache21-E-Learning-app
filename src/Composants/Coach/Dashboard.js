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