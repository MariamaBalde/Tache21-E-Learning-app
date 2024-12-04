import React, { useEffect, useState } from 'react';
import { db } from '../../../Config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';

const PlayQuiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      const quizRef = doc(db, 'quizzes', quizId);
      const quizSnap = await getDoc(quizRef);
      if (quizSnap.exists()) {
        setQuizData(quizSnap.data());
        setUserAnswers(new Array(quizSnap.data().questions.length).fill(null));
      } else {
        console.log('Quiz non trouvé !');
      }
    };

    fetchQuizData();
  }, [quizId]);

  const handleAnswerChange = (answer) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = answer;
    setUserAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (userAnswers[currentQuestionIndex] === null) {
      alert('Veuillez sélectionner une réponse avant de continuer !');
      return;
    }

    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setSubmitted(true);
      calculateScore();
    }
  };

  const calculateScore = () => {
    const correctAnswers = quizData.questions.reduce((acc, question, index) => {
      return acc + (question.correctAnswer === userAnswers[index] ? 1 : 0);
    }, 0);
    setScore(correctAnswers);
  };

  const handleRestartQuiz = () => {
    setUserAnswers(new Array(quizData.questions.length).fill(null));
    setCurrentQuestionIndex(0);
    setSubmitted(false);
    setScore(null);
  };

  if (!quizData) return <div className="text-center py-10">Chargement...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        {quizData.title}
      </h2>

      {submitted ? (
        <div>
          <h3 className="text-lg font-semibold text-center">
            Votre score : {score} sur {quizData.questions.length}
          </h3>
          <h4 className="mt-4 font-semibold text-center">
            Détails des réponses :
          </h4>
          <ul className="mt-4">
            {quizData.questions.map((question, index) => (
              <li key={index} className="mb-4 border-b pb-4">
                <p className="font-semibold">
                  {index + 1}. {question.question}
                </p>
                <p
                  className={`text-lg ${
                    userAnswers[index] === question.correctAnswer
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  Votre réponse :{' '}
                  {userAnswers[index] !== null
                    ? question.options[userAnswers[index]]
                    : 'Aucune réponse'}
                </p>
                <p className="text-blue-600">
                  Réponse correcte : {question.options[question.correctAnswer]}
                </p>
                <div className="mt-2">
                  <p className="font-semibold">Réponses proposées :</p>
                  <ul className="list-disc pl-5">
                    {question.options.map((option, optIndex) => (
                      <li
                        key={optIndex}
                        className={
                          optIndex === question.correctAnswer
                            ? 'text-blue-600'
                            : ''
                        }
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          {/* Boutons pour recommencer ou quitter */}
          <div className="flex justify-around mt-6">
            <button
              onClick={handleRestartQuiz}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition duration-200"
            >
              Recommencer
            </button>
            <button
              onClick={() =>
                navigate(`/coach/dashboard/quizzes/quiz-details/${quizId}`)
              } // Rediriger vers la liste des quiz
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition duration-200"
            >
              Quitter
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold">
            Question {currentQuestionIndex + 1} :
          </h3>
          <p className="mt-2">
            {quizData.questions[currentQuestionIndex].question}
          </p>
          <ul className="list-disc pl-5 mt-4">
            {quizData.questions[currentQuestionIndex].options.map(
              (option, index) => (
                <li key={index} className="flex items-center mb-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="answer"
                      value={index}
                      checked={userAnswers[currentQuestionIndex] === index}
                      onChange={() => handleAnswerChange(index)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                </li>
              )
            )}
          </ul>
        </div>
      )}

      {/* Bouton pour soumettre ou passer à la question suivante */}
      {!submitted && (
        <div className="mt-6">
          <button
            onClick={handleNextQuestion}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200"
          >
            {currentQuestionIndex < quizData.questions.length - 1
              ? 'Suivant'
              : 'Terminer'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PlayQuiz;
