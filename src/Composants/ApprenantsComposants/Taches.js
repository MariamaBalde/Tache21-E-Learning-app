// src/Composants/ApprenantsComposants/Taches.js
import React from 'react';

const Taches = () => {
  const tasks = [
    { id: 1, title: "Lire le chapitre 2 de React", completed: false },
    { id: 2, title: "Faire les exercices CSS", completed: false },
    { id: 3, title: "Réviser le module JavaScript", completed: true },
  ];

  return (
    <div className="space-y-6">
      {tasks.map((task) => (
        <div key={task.id} className={`bg-white p-6 rounded-lg shadow-lg ${task.completed ? 'bg-green-100' : ''}`}>
          <h3 className="text-lg font-medium">{task.title}</h3>
          <div className="mt-4">
            {task.completed ? (
              <span className="text-green-600">Tâche terminée</span>
            ) : (
              <button className="bg-blue-600 text-white py-2 px-4 rounded">Marquer comme terminée</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Taches;
