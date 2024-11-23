import React, { useState } from "react";
import { addQuizz } from "./QuizService";

const AddQuizz = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [archived, setArchived] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newQuiz = { title, description, archived };
    try {
      const id = await addQuizz(newQuiz);
      console.log("Quiz ajouté avec succès, ID:", id);
      setTitle("");
      setDescription("");
      setArchived(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout du quiz:", error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h3 className="text-2xl font-semibold text-blue-600 mb-6">Ajouter un Quiz</h3>
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          Titre:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="block mb-4">
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="block mb-6">
          Archiver ?
          <input
            type="checkbox"
            checked={archived}
            onChange={(e) => setArchived(e.target.checked)}
            className="ml-2"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition"
        >
          Ajouter le quiz
        </button>
      </form>
    </div>
  );
};

export default AddQuizz;
