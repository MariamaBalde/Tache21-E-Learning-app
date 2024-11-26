import React, { useState } from "react";
import { db } from "../../../Config/firebaseConfig"; // Assurez-vous que le chemin est correct
import { collection, addDoc } from "firebase/firestore";

const AddQuiz = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !description) {
      setError("Tous les champs sont obligatoires !");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "quizzes"), {
        title,
        description,
        createdAt: new Date(),
      });
      setSuccess("Quiz ajouté avec succès ! ID : " + docRef.id);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("Erreur lors de l'ajout : ", err);
      setError("Erreur lors de l'ajout du quiz.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">Ajouter un Quiz</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Titre</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AddQuiz;
