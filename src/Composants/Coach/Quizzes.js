// src/Composants/Coach/Quizzes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import QuizList from './quizz/QuizList';
import AddQuiz from './quizz/AddQuiz';
import EditQuiz from './quizz/EditQuiz';
import QuizDetails from './quizz/QuizDetails';
import PlayQuiz from './quizz/PlayQuiz';

const Quizzes = () => {
  return (
    <Routes>
      <Route path="/" element={<QuizList />} />
      <Route path="add-quiz" element={<AddQuiz />} />
      <Route path="edit-quiz/:quizId" element={<EditQuiz />} />
      <Route path="quiz-details/:quizId" element={<QuizDetails />} />
      <Route path="play-quiz/:quizId" element={<PlayQuiz />} />
    </Routes>
  );
};

export default Quizzes;