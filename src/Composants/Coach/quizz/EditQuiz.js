import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../../Config/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const EditQuiz = () => {
  const { id } = useParams();
  const [quizData, setQuizData] = useState({
    title: "",
    subject: "html-css",
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0
      }
    ]
  });

  const navigate = useNavigate();

  // Charger les données du quiz depuis Firestore
  useEffect(() => {
    const fetchQuiz = async () => {
      const docRef = doc(db, "quizzes", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setQuizData(docSnap.data());
      } else {
        console.log("Aucun quiz trouvé");
      }
    };

    fetchQuiz();
  }, [id]);

  // Gérer les changements dans le formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...quizData.questions];
    newQuestions[index][field] = value;
    setQuizData((prevState) => ({
      ...prevState,
      questions: newQuestions
    }));
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...quizData.questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuizData((prevState) => ({
      ...prevState,
      questions: newQuestions
    }));
  };

  // Ajouter une nouvelle question
  const handleAddQuestion = () => {
    setQuizData((prevState) => ({
      ...prevState,
      questions: [
        ...prevState.questions,
        { question: "", options: ["", "", "", ""], correctAnswer: 0 }
      ]
    }));
  };

  // Supprimer une question
  const handleDeleteQuestion = (index) => {
    const newQuestions = [...quizData.questions];
    newQuestions.splice(index, 1); // Supprime la question à l'index spécifié
    setQuizData((prevState) => ({
      ...prevState,
      questions: newQuestions
    }));
  };

  // Enregistrer les modifications dans Firestore
  const handleSaveChanges = async () => {
    const quizRef = doc(db, "quizzes", id);

    try {
      await updateDoc(quizRef, quizData);
      alert("Quiz modifié avec succès !");
      navigate("/"); // Redirige après la modification
    } catch (error) {
      console.error("Erreur lors de la modification du quiz :", error);
      alert("Échec de la modification du quiz");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Modifier un Quiz</h2>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre du quiz :</label>
          <input
            id="title"
            type="text"
            name="title"
            value={quizData.title}
            onChange={handleInputChange}
            placeholder="Titre du Quiz"
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Sujet :</label>
          <select
            id="subject"
            name="subject"
            value={quizData.subject}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="html-css">HTML/CSS</option>
            <option value="javascript">JavaScript</option>
            <option value="react">React</option>
            <option value="bootstrap">Bootstrap</option>
          </select>
        </div>

        {quizData.questions.map((q, index) => (
          <div key={index} className="space-y-4 border p-4 rounded-md shadow-sm">
            <h4 className="font-semibold text-lg text-gray-700">Question {index + 1}</h4>

            <input
              type="text"
              value={q.question}
              onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
              placeholder="Entrez la question"
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {q.options.map((option, optIndex) => (
              <input
                key={optIndex}
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, optIndex, e.target.value)}
                placeholder={`Option ${optIndex + 1}`}
                className="mt-2 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            ))}

            <div className="mt-2">
              <label className="text-sm font-medium text-gray-700">Réponse correcte :</label>
              <select
                value={q.correctAnswer}
                onChange={(e) => handleQuestionChange(index, "correctAnswer", parseInt(e.target.value))}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {q.options.map((_, optIndex) => (
                  <option key={optIndex} value={optIndex}>
                    Option {optIndex + 1}
                  </option>
                ))}
              </select>
            </div>

            {/* Bouton de suppression pour chaque question */}
            <button
              type="button"
              onClick={() => handleDeleteQuestion(index)}
              className="mt-4 inline-block px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-500"
            >
              Supprimer cette question
            </button>
          </div>
        ))}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleAddQuestion}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500"
          >
            Ajouter une question
          </button>
          <button
            type="submit"
            onClick={handleSaveChanges}
            className="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-500"
          >
            Sauvegarder les changements
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-500"
          >
            Retour à la liste
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditQuiz;
