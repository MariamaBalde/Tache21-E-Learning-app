import React, { useState } from "react";
import quizData from "./quizData";

function HtmlCssQuiz() {
  const htmlCssQuestions = quizData.htmlCssQuestions;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore((prev) => prev + 1);

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < htmlCssQuestions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="quiz-container p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      {showScore ? (
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Quiz Terminé</h2>
          <p className="text-xl">Votre score : {score}/{htmlCssQuestions.length}</p>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-bold mb-4">
            {htmlCssQuestions[currentQuestionIndex].question}
          </h3>
          <div className="options space-y-3">
            {htmlCssQuestions[currentQuestionIndex].answers.map((answer) => (
              <button
                key={answer.text}
                onClick={() => handleAnswer(answer.isCorrect)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full text-left focus:outline-none"
              >
                {answer.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default HtmlCssQuiz;
