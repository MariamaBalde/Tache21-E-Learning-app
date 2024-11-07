import React from 'react';
import Cours from './Cours';

const CoursApp = () => {
  // Définir le tableau 'courses' ici
  const courses = [
    { title: 'HTML/CSS', description: 'Un cours pour débutants sur HTML/CSS' },
    { title: 'BOOTSTRAP', description: 'Approfondissez vos connaissances en BOOTSTRAP' },
    { title: 'JAVASCRIPT', description: 'Apprenez les dernières techniques JAVASCRIPT' },
    { title: 'ReactJS', description: 'Un cours pour maîtriser ReactJS' }
  ];

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Nos Cours</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        {/* On parcourt 'courses' pour créer un composant 'Cours' pour chaque élément */}
        {courses.map((course, index) => (
          <Cours key={index} title={course.title} description={course.description} />
        ))}
      </div>
    </div>
  );
};

export default CoursApp;
