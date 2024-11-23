import React, { useEffect, useState } from "react";
import { getAllQuizzes, archiveQuizz } from "./QuizService";

function ListQuizzes() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const data = await getAllQuizzes();
      setQuizzes(data);
    };
    fetchQuizzes();
  }, []);

  const handleArchive = async (id) => {
    try {
      await archiveQuizz(id);
      setQuizzes((prev) => prev.filter((quiz) => quiz.id !== id));
    } catch (error) {
      console.error("Erreur lors de l'archivage du quiz:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-blue-600 mb-6">Liste des Quizzes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white shadow-lg rounded-lg p-4 border border-gray-200"
          >
            <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
            <p className="text-gray-700 mb-4">{quiz.description}</p>
            <button
              onClick={() => handleArchive(quiz.id)}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
            >
              Archiver
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListQuizzes;
