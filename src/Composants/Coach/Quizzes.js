import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import ListQuizzes from "./quizz/ListQuizzes";
import AddQuizz from "./quizz/AddQuizz";
import HtmlCssQuiz from "./quizz/HtmlCssQuiz";
import BootstrapQuiz from "./quizz/BootstrapQuiz";
import JavaScriptQuiz from "./quizz/JavaScriptQuiz";
import ReactQuiz from "./quizz/ReactQuiz";
import QuizzDetails from "./quizz/QuizzDetails"; // Import du composant

function Quizzes() {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <nav className="mb-6">
        <ul className="flex space-x-6">
          <li>
            <NavLink
              to="list"
              className="text-lg font-semibold text-blue-600 hover:text-blue-800"
            >
              Liste des quizzes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="add"
              className="text-lg font-semibold text-blue-600 hover:text-blue-800"
            >
              Ajouter un quiz
            </NavLink>
          </li>
          <li>
            <NavLink
              to="html-css"
              className="text-lg font-semibold text-blue-600 hover:text-blue-800"
            >
              HTML/CSS Quiz
            </NavLink>
          </li>
          <li>
            <NavLink
              to="bootstrap"
              className="text-lg font-semibold text-blue-600 hover:text-blue-800"
            >
              Bootstrap Quiz
            </NavLink>
          </li>
          <li>
            <NavLink
              to="javascript"
              className="text-lg font-semibold text-blue-600 hover:text-blue-800"
            >
              JavaScript Quiz
            </NavLink>
          </li>
          <li>
            <NavLink
              to="react"
              className="text-lg font-semibold text-blue-600 hover:text-blue-800"
            >
              React Quiz
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="list" element={<ListQuizzes />} />
        <Route path="add" element={<AddQuizz />} />
        <Route path="html-css" element={<HtmlCssQuiz />} />
        <Route path="bootstrap" element={<BootstrapQuiz />} />
        <Route path="javascript" element={<JavaScriptQuiz />} />
        <Route path="react" element={<ReactQuiz />} />
        <Route path=":id" element={<QuizzDetails />} />
        {/* <Route path="/quiz/:id" element={<QuizzDetails />} /> */}
      </Routes>
    </div>
  );
}

export default Quizzes;
