import { useState } from 'react';

function Taches() {
  const [tasks, setTasks] = useState([
    { name: "Lire le chapitre 1", completed: false },
    { name: "Faire l'exercice 1", completed: false },
  ]);

  const handleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h3>Tâches à réaliser</h3>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleTaskCompletion(index)}
            />
            {task.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Taches;
