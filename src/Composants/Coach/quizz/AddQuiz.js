// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { addQuiz } from './QuizService';

// const AddQuiz = () => {
//   const [quizData, setQuizData] = useState({
//     title: "",
//     course: "html-css",
//     questions: [
//       {
//         question: "",
//         options: ["", "", "", ""],
//         correctAnswer: 0,
//       }
//     ]
//   });

//   const [loading, setLoading] = useState(false); // Nouvel état de chargement
//   const [showQuestions, setShowQuestions] = useState(false);
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setQuizData((prevState) => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleQuestionChange = (index, field, value) => {
//     const newQuestions = [...quizData.questions];
//     newQuestions[index][field] = value;
//     setQuizData((prevState) => ({
//       ...prevState,
//       questions: newQuestions
//     }));
//   };

//   const handleOptionChange = (questionIndex, optionIndex, value) => {
//     const newQuestions = [...quizData.questions];
//     newQuestions[questionIndex].options[optionIndex] = value;
//     setQuizData((prevState) => ({
//       ...prevState,
//       questions: newQuestions
//     }));
//   };

//   const handleAddQuestion = () => {
//     setQuizData((prevState) => ({
//       ...prevState,
//       questions: [
//         ...prevState.questions,
//         { question: "", options: ["", "", "", ""], correctAnswer: 0 }
//       ]
//     }));
//   };

//   const handleCancelAddQuestion = (index) => {
//     const newQuestions = [...quizData.questions];
//     newQuestions.splice(index, 1);
//     setQuizData((prevState) => ({
//       ...prevState,
//       questions: newQuestions
//     }));
//   };

//   const handleAddQuiz = async () => {
//     if (quizData.title && quizData.questions.every(q => q.question && q.options.every(o => o))) {
//       setLoading(true); // Activer le loader
//       try {
//         await addQuiz(quizData);
//         alert("Quiz ajouté avec succès !");
//         setQuizData({
//           title: "",
//           course: "html-css",
//           questions: [{ question: "", options: ["", "", "", ""], correctAnswer: 0 }],
//         });
//         navigate('/coach/dashboard/quizzes');
//       } catch (error) {
//         alert("Une erreur est survenue lors de l'ajout du quiz.");
//         console.error("Erreur lors de l'ajout du quiz : ", error);
//       } finally {
//         setLoading(false); // Désactiver le loader
//       }
//     } else {
//       alert("Veuillez remplir tous les champs.");
//     }
//   };

//   const toggleQuestionsVisibility = () => {
//     setShowQuestions(!showQuestions);
//   };

//   return (
//     <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
//       <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Ajouter un Quiz</h2>
//       <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
//         <div>
//           <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre du quiz :</label>
//           <input
//             id="title"
//             type="text"
//             name="title"
//             value={quizData.title}
//             onChange={handleInputChange}
//             placeholder="Titre du Quiz"
//             className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//             disabled={loading} // Désactiver le champ pendant le chargement
//           />
//         </div>

//         <div>
//           <label htmlFor="course" className="block text-sm font-medium text-gray-700">Cours :</label>
//           <select
//             id="course"
//             name="course"
//             value={quizData.course}
//             onChange={handleInputChange}
//             className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//             disabled={loading}
//           >
//             <option value="html-css">HTML/CSS</option>
//             <option value="bootstrap">Bootstrap</option>
//             <option value="javascript">JavaScript</option>
//             <option value="react">React</option>
//           </select>
//         </div>

//         <div className="mt-4">
//           <button
//             type="button"
//             onClick={toggleQuestionsVisibility}
//             className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500"
//             disabled={loading}
//           >
//             {showQuestions ? "Masquer les questions" : "Voir les questions"}
//           </button>
//         </div>

//         {showQuestions && quizData.questions.map((q, index) => (
//           <div key={index} className="space-y-4 border p-4 rounded-md shadow-sm">
//             <h4 className="font-semibold text-lg text-gray-700">Question {index + 1}</h4>

//             <input
//               type="text"
//               value={q.question}
//               onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
//               placeholder="Entrez la question"
//               className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//               disabled={loading}
//             />

//             {q.options.map((option, optIndex) => (
//               <input
//                 key={optIndex}
//                 type="text"
//                 value={option}
//                 onChange={(e) => handleOptionChange(index, optIndex, e.target.value)}
//                 placeholder={`Option ${optIndex + 1}`}
//                 className="mt-2 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//                 disabled={loading}
//               />
//             ))}
//           </div>
//         ))}

//         <div className="flex justify-between">
//           <button
//             type="button"
//             onClick={handleAddQuestion}
//             className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500"
//             disabled={loading}
//           >
//             Ajouter une question
//           </button>
//           <button
//             type="submit"
//             onClick={handleAddQuiz}
//             className="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-500"
//             disabled={loading}
//           >
//             {loading ? "Ajout en cours..." : "Ajouter le Quiz"}
//           </button>
//         </div>

//         <div className="mt-4 text-center">
//           <button
//             onClick={() => navigate("/")}
//             className="px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-500"
//             disabled={loading}
//           >
//             Retour à la liste
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddQuiz;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addQuiz } from './QuizService';

const AddQuiz = () => {
  const [quizData, setQuizData] = useState({
    title: "",
    course: "html-css",
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
      }
    ]
  });

  const [showQuestions, setShowQuestions] = useState(false);
  const navigate = useNavigate();

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

  const handleAddQuestion = () => {
    setQuizData((prevState) => ({
      ...prevState,
      questions: [
        ...prevState.questions,
        { question: "", options: ["", "", "", ""], correctAnswer: 0 }
      ]
    }));
  };

  const handleCancelAddQuestion = (index) => {
    const newQuestions = [...quizData.questions];
    newQuestions.splice(index, 1);
    setQuizData((prevState) => ({
      ...prevState,
      questions: newQuestions
    }));
  };

  const handleAddQuiz = async () => {
    if (quizData.title && quizData.questions.every(q => q.question && q.options.every(o => o))) {
      try {
        await addQuiz(quizData);
        alert("Quiz ajouté avec succès !");
        setQuizData({
          title: "",
          course: "html-css",
          questions: [{ question: "", options: ["", "", "", ""], correctAnswer: 0 }],
        });
        navigate('/coach/dashboard/quizzes'); // Redirection vers la page des quizzes
      } catch (error) {
        alert("Une erreur est survenue lors de l'ajout du quiz.");
        console.error("Erreur lors de l'ajout du quiz : ", error);
      }
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const toggleQuestionsVisibility = () => {
    setShowQuestions(!showQuestions);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Ajouter un Quiz</h2>
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
          <label htmlFor="course" className="block text-sm font-medium text-gray-700">Cours :</label>
          <select
            id="course"
            name="course"
            value={quizData.course}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="html-css">HTML/CSS</option>
            <option value="bootstrap">Bootstrap</option>
            <option value="javascript">JavaScript</option>
            <option value="react">React</option>
          </select>
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={toggleQuestionsVisibility}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500"
          >
            {showQuestions ? "Masquer les questions" : "Voir les questions"}
          </button>
        </div>

        {showQuestions && quizData.questions.map((q, index) => (
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

            {quizData.questions.length > 1 && (
              <button
                type="button"
                onClick={() => handleCancelAddQuestion(index)}
                className="mt-4 inline-block px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-500"
              >
                Annuler cette question
              </button>
            )}
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
            onClick={handleAddQuiz}
            className="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-500"
          >
            Ajouter le Quiz
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

export default AddQuiz;
