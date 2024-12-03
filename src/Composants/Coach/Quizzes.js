// src/Composants/Coach/Quizzes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import QuizList from './quizz/QuizList';
import AddQuiz from './quizz/AddQuiz';
import EditQuiz from './quizz/EditQuiz';
import QuizDetails from './quizz/QuizDetails';

const Quizzes = () => {
  return (
    <Routes>
      <Route path="/" element={<QuizList />} />
      <Route path="add-quiz" element={<AddQuiz />} />
      <Route path="edit-quiz/:quizId" element={<EditQuiz />} />
      <Route path="quiz-details/:quizId" element={<QuizDetails />} />
    </Routes>
  );
};

export default Quizzes;

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import QuizList from './quizz/QuizList';
// import EditQuiz from './quizz/EditQuiz';

// const Quizzes = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<QuizList />} />
//         <Route path="/edit-quiz" element={<EditQuiz />} />
//       </Routes>
//     </Router>
//   );
// };

// export default Quizzes;
