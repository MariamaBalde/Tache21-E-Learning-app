import React, { useState, useEffect } from 'react';

const QuizzesEtudiants = () => {
  const [quizzes, setQuizzes] = useState([
    { id: 1, question: 'What is React?', options: ['Library', 'Framework', 'Language', 'None'], correct: 'Library' },
    { id: 2, question: 'What is JSX?', options: ['Syntax', 'Component', 'Style', 'None'], correct: 'Syntax' },
  ]); // Exemple de questions
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  // Fonction pour vérifier la réponse
  const handleAnswer = (answer) => {
    if (answer === quizzes[currentQuizIndex].correct) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsQuizCompleted(true);
    }
  };

  return (
    <div className="quiz-container p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">Quizzes pour les apprenants</h1>

      {!isQuizCompleted ? (
        <div className="quiz-question">
          <h2 className="text-xl mb-4">{quizzes[currentQuizIndex].question}</h2>
          <div className="quiz-options flex flex-col gap-2">
            {quizzes[currentQuizIndex].options.map((option, index) => (
              <button
                key={index}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="quiz-results text-center">
          <h2 className="text-xl font-bold mb-4">Quiz Terminé !</h2>
          <p className="text-lg">Votre score : {score} / {quizzes.length}</p>
        </div>
      )}
    </div>
  );
};

export default QuizzesEtudiants;
