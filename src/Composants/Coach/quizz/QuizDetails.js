import React, { useEffect, useState } from 'react';
import { db } from '../../../Config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useParams, Link } from 'react-router-dom';

const QuizDetails = () => {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [isArchived, setIsArchived] = useState(false);
  const [loading, setLoading] = useState(true); // État pour gérer le loader
  const [error, setError] = useState(null); // État pour gérer les erreurs

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const quizRef = doc(db, 'quizzes', quizId);
        const quizSnap = await getDoc(quizRef);

        if (quizSnap.exists()) {
          setQuizData(quizSnap.data());
          setIsArchived(quizSnap.data().archived); // Vérifiez si le quiz est archivé
        } else {
          setError('Quiz non trouvé !');
        }
      } catch (err) {
        console.error('Erreur lors de la récupération du quiz:', err);
        setError("Impossible de récupérer les détails du quiz.");
      } finally {
        setLoading(false); // Le chargement est terminé
      }
    };

    fetchQuizDetails();
  }, [quizId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p className="ml-2 text-gray-700">Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="px-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">{quizData.title}</h2>
      <p className="mb-4">Cours: {quizData.course}</p>

      {isArchived ? (
        <div className="bg-red-100 p-4 rounded">
          <p>Ce quiz est archivé. Aucune action ne peut être effectuée.</p>
        </div>
      ) : (
        <div>
          <h4 className="text-xl font-bold text-blue-600">Questions :</h4>
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
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-900">
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
