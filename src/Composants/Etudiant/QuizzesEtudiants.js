import React, { useEffect, useState } from 'react';
import { db } from '../../Config/firebaseConfig'; // Assurez-vous d'importer votre configuration Firebase
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const QuizzesEtudiants = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const quizCollection = collection(db, 'quizzes'); // Assurez-vous que le chemin correspond à votre collection
        const quizSnapshot = await getDocs(quizCollection);
        const quizList = quizSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setQuizzes(quizList);
      } catch (error) {
        console.error('Erreur lors de la récupération des quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  const handlePlayQuiz = (quizId) => {
    // Navigue vers la page de questions du quiz
    navigate(`/etudiant/dashboard/quizzes/quiz-details/${quizId}/play-quiz/${quizId}`);
    };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {quizzes.map(quiz => (
        <div key={quiz.id} className="border p-4 rounded shadow">
          <h3 className="text-lg font-bold">{quiz.title}</h3>
          <p>{quiz.description}</p>
          <button
            onClick={() => handlePlayQuiz(quiz.id)}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Jouer
          </button>
        </div>
      ))}
    </div>
  );
};

export default QuizzesEtudiants;





// import React, { useState, useEffect } from 'react';

// const QuizzesEtudiants = () => {
//   const [quizzes, setQuizzes] = useState([
//     { id: 1, question: 'What is React?', options: ['Library', 'Framework', 'Language', 'None'], correct: 'Library' },
//     { id: 2, question: 'What is JSX?', options: ['Syntax', 'Component', 'Style', 'None'], correct: 'Syntax' },
//   ]); // Exemple de questions
//   const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
//   const [score, setScore] = useState(0);
//   const [isQuizCompleted, setIsQuizCompleted] = useState(false);

//   // Fonction pour vérifier la réponse
//   const handleAnswer = (answer) => {
//     if (answer === quizzes[currentQuizIndex].correct) {
//       setScore((prevScore) => prevScore + 1);
//     }

//     if (currentQuizIndex < quizzes.length - 1) {
//       setCurrentQuizIndex((prevIndex) => prevIndex + 1);
//     } else {
//       setIsQuizCompleted(true);
//     }
//   };

//   return (
//     <div className="quiz-container p-4">
//       <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">Quizzes pour les apprenants</h1>

//       {!isQuizCompleted ? (
//         <div className="quiz-question">
//           <h2 className="text-xl mb-4">{quizzes[currentQuizIndex].question}</h2>
//           <div className="quiz-options flex flex-col gap-2">
//             {quizzes[currentQuizIndex].options.map((option, index) => (
//               <button
//                 key={index}
//                 className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
//                 onClick={() => handleAnswer(option)}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div className="quiz-results text-center">
//           <h2 className="text-xl font-bold mb-4">Quiz Terminé !</h2>
//           <p className="text-lg">Votre score : {score} / {quizzes.length}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuizzesEtudiants;
