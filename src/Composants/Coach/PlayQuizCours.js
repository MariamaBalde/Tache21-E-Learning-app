import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Pour récupérer l’ID du quiz
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Config/firebaseConfig';

const PlayQuizCours = () => {
  const { id } = useParams(); // Récupérer l’ID du quiz depuis l’URL
  const [quiz, setQuiz] = useState(null); // Stocker les données du quiz
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Suivre la question actuelle
  const [score, setScore] = useState(0); // Stocker le score

  useEffect(() => {
    // Charger le quiz depuis Firebase
    const fetchQuiz = async () => {
      try {
        const quizDoc = await getDoc(doc(db, 'quizzes', id));
        if (quizDoc.exists()) {
          setQuiz(quizDoc.data());
        } else {
          console.error('Quiz non trouvé !');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du quiz :', error);
      }
    };

    fetchQuiz();
  }, [id]);

  // Fonction appelée lorsqu’une réponse est sélectionnée
  const handleAnswer = (index) => {
    const correctIndex = quiz.questions[currentQuestionIndex].correctAnswer;
    if (index === correctIndex) {
      setScore(score + 1); // Incrémenter le score si la réponse est correcte
    }

    // Passer à la question suivante ou terminer le quiz
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert(
        `Quiz terminé ! Votre score : ${score + 1}/${quiz.questions.length}`
      );
    }
  };

  if (!quiz) return <div>Chargement...</div>;

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div>
      <h1>{quiz.course}</h1>
      <h2>
        Question {currentQuestionIndex + 1}/{quiz.questions.length}
      </h2>
      <p>{currentQuestion.questionText}</p>
      <div>
        {currentQuestion.options.map((option, index) => (
          <button key={index} onClick={() => handleAnswer(index)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlayQuizCours;
