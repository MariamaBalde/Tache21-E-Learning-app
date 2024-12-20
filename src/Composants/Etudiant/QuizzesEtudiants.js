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
        const quizCollection = collection(db, 'quizzes');
        const quizSnapshot = await getDocs(quizCollection);
        const quizList = quizSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(quizList); // Vérifiez que les données sont bien récupérées
        setQuizzes(quizList);
      } catch (error) {
        console.error('Erreur lors de la récupération des quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  const handlePlayQuiz = (quizId) => {
    console.log(`Navigating to quiz with ID: ${quizId}`);
    navigate(`/etudiant/dashboard/quizzes/quiz-details/${quizId}/play-quiz`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {quizzes.length > 0 ? (
        quizzes.map(quiz => (
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
        ))
      ) : (
        <p>Aucun quiz disponible.</p>
      )}
    </div>
  );
};

export default QuizzesEtudiants;
