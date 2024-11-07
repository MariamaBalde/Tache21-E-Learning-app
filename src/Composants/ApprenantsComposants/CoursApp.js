import React from 'react';
import Cours from './Cours';
import htmlcssImage from '../../Images/ImageCours/htmlcss.webp'; 
import imageBootstrap from '../../Images/ImageCours/imageBootstrap.png'; 
import imageJs from '../../Images/ImageCours/imageJs.webp'; 
import imageReact from '../../Images/ImageCours/imageReact.webp'; 




const CoursApp = () => {
  const courses = [
    { title: 'HTML/CSS', description: 'Un cours pour débutants sur HTML/CSS', image: htmlcssImage },
    { title: 'BOOTSTRAP', description: 'Approfondissez vos connaissances en BOOTSTRAP', image: imageBootstrap },
    { title: 'JAVASCRIPT', description: 'Apprenez les dernières techniques en JAVASCRIPT', image: imageJs },
    { title: 'ReactJS', description: 'Un cours pour maîtriser ReactJS', image: imageReact }
  ];

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Nos Cours</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        {courses.map((course, index) => (
          <Cours key={index} title={course.title} description={course.description} image={course.image} />
        ))}
      </div>
    </div>
  );
};

export default CoursApp;
