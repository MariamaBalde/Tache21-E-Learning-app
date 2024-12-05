import React, { useEffect, useState } from 'react';
import { db } from '../../../Config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { toggleArchiveQuiz } from './QuizService';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true); // S'assurer que nous commençons à charger
      try {
        const querySnapshot = await getDocs(collection(db, 'quizzes'));
        const quizList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuizzes(quizList);
      } catch (error) {
        console.error('Erreur lors de la récupération des quiz :', error);
      } finally {
        setLoading(false); // Fin du chargement, que la récupération ait réussi ou échoué
      }
    };

    fetchQuizzes();
  }, []);

  const handleToggleArchive = async (id, archived) => {
    try {
      const newArchivedState = await toggleArchiveQuiz(id, archived);
      setQuizzes((prevQuizzes) =>
        prevQuizzes.map((quiz) =>
          quiz.id === id ? { ...quiz, archived: newArchivedState } : quiz
        )
      );
      alert(newArchivedState ? 'Quiz archivé !' : 'Quiz désarchivé !');
    } catch (error) {
      console.error("Erreur lors de l'archivage :", error);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Chargement...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Liste des Quiz</h2>

      <Link to="add-quiz">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg mb-6 hover:bg-blue-500">
          Ajouter un nouveau quiz
        </button>
      </Link>

      {quizzes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className={`bg-white shadow-md rounded-lg p-4 border ${
                quiz.archived ? 'border-gray-400' : 'border-blue-600'
              }`}
            >
              <h3 className="font-semibold text-lg text-blue-600">
                {quiz.title}
              </h3>
              <p className="text-gray-500">Cours: {quiz.course}</p>

              <Link to={`quiz-details/${quiz.id}`}>
                <button className="mt-4 mb-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 w-full">
                  Voir les questions
                </button>
              </Link>

              <div className="flex space-x-2 mt-4">
                <Link to={`edit-quiz/${quiz.id}`}>
                  <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500">
                    Modifier
                  </button>
                </Link>
                <button
                  className={`px-4 py-2 rounded-lg ${
                    quiz.archived
                      ? 'bg-green-600 hover:bg-green-500'
                      : 'bg-red-600 hover:bg-red-500'
                  } text-white`}
                  onClick={() => handleToggleArchive(quiz.id, quiz.archived)}
                >
                  {quiz.archived ? 'Désarchiver' : 'Archiver'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Aucun quiz disponible.</p>
      )}
    </div>
  );
};

export default QuizList;
