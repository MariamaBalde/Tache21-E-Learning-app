import React, { useEffect, useState } from 'react';
import { db } from '../../../Config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useParams, Link } from 'react-router-dom';

const QuizDetails = () => {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchQuizDetails = async () => {
      const quizRef = doc(db, 'quizzes', quizId);
      const quizSnap = await getDoc(quizRef);
      if (quizSnap.exists()) {
        setQuizData(quizSnap.data());
      } else {
        console.log('Quiz non trouvé !');
      }
    };

    const fetchScores = async () => {
      // Remplace par la logique pour récupérer les scores des étudiants
      // const scoresRef = collection(db, "scores"); // Exemple
      // const scoresSnap = await getDocs(scoresRef);
      // setScores(scoresSnap.docs.map(doc => doc.data()));
    };

    fetchQuizDetails();
    fetchScores();
  }, [quizId]);

  if (!quizData) return <div>Chargement...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">{quizData.title}</h2>
      <p className="mb-4">Cours: {quizData.course}</p>

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
      </div>

      <div>
        <h4 className="text-xl font-bold">Scores des Étudiants :</h4>
        {scores.length > 0 ? (
          scores.map((score, index) => (
            <div key={index} className="mt-2">
              <p>
                {score.studentId}: {score.score}
              </p>
            </div>
          ))
        ) : (
          <p>Aucun score disponible.</p>
        )}
      </div>

      {/* Lien pour jouer au quiz */}
      <div className="mt-6">
        <Link
          to={`/coach/dashboard/quizzes/quiz-details/${quizId}/play-quiz/${quizId}`}
        >
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500">
            Jouer au Quiz
          </button>
        </Link>
      </div>
    </div>
  );
};

export default QuizDetails;
