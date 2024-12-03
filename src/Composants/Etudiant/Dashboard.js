import React from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="p-6">
      <section className="mb-8">
        {/* Header for Word Sets */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Word Sets</h2>
          <div className="flex space-x-2">
            <ChevronLeft className="w-6 h-6 text-gray-500" />
            <ChevronRight className="w-6 h-6 text-gray-500" />
          </div>
        </div>

        {/* Word sets grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <WordSetCard title="Books and Library" gradient="from-purple-400 to-pink-500" icon="📚" />
          <WordSetCard title="Countries and cities" gradient="from-purple-400 to-indigo-500" icon="🌍" />
          <WordSetCard title="What is o'clock now?" gradient="from-cyan-400 to-blue-500" icon="🕰" />
        </div>
      </section>
    </div>
  );
}

// WordSetCard component integrated directly into Dashboard.js
function WordSetCard({ title, gradient, icon }) {
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-lg p-4 text-white relative overflow-hidden`}>
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="font-semibold">{title}</h3>
      <div className="absolute top-2 right-2 bg-white bg-opacity-30 rounded-full p-1">
        <Heart className="w-4 h-4 text-white" />
      </div>
    </div>
  );
}
