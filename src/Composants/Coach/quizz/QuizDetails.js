// src/Composants/Coach/quizz/QuizDetails.js
import React, { useEffect, useState } from 'react';
import { db } from '../../../Config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useParams, Link } from 'react-router-dom';

const QuizDetails = () => {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [isArchived, setIsArchived] = useState(false);

  useEffect(() => {
    const fetchQuizDetails = async () => {
      const quizRef = doc(db, 'quizzes', quizId);
      const quizSnap = await getDoc(quizRef);
      if (quizSnap.exists()) {
        setQuizData(quizSnap.data());
        setIsArchived(quizSnap.data().archived); // Vérifiez si le quiz est archivé
      } else {
        console.log('Quiz non trouvé !');
      }
    };

    fetchQuizDetails();
  }, [quizId]);

  if (!quizData) return <div>Chargement...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">{quizData.title}</h2>
      <p className="mb-4">Cours: {quizData.course}</p>

      {isArchived ? (
        <div className="bg-red-100 p-4 rounded">
          <p>Ce quiz est archivé. Aucune action ne peut être effectuée.</p>
        </div>
      ) : (
        <div>
          <h4 className="text-xl font-bold">Questions :</h4>
          {quizData.questions.map((question, index) => (
            <div key={index} className="mt-4 mb-6">
              <p className="font-semibold text-gray-700">
                {index + 1}. {question.question}
              </p>
              <ul className="list-disc pl-5 text-gray-600">
                {question.options.map((option, optIndex) => (
                  <li key={optIndex}>
                    {option}{' '}
                    {question.correctAnswer === optIndex && '(Réponse correcte)'}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div className="mt-6">
            <Link to={`/coach/dashboard/quizzes/quiz-details/${quizId}/play-quiz/${quizId}`}>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500">
                Jouer au Quiz
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizDetails;