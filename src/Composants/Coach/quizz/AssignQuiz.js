// import React, { useEffect, useState } from "react";
// import { db } from "../../../Config/firebaseConfig";
// import { collection, getDocs } from "firebase/firestore";

// const AssignQuiz = () => {
//   const [quizzes, setQuizzes] = useState([]);

//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       const quizzesCollection = collection(db, "quizzes");
//       const quizSnapshot = await getDocs(quizzesCollection);
//       const quizList = quizSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setQuizzes(quizList);
//     };

//     fetchQuizzes();
//   }, []);

//   const handleAssign = (quizId) => {
//     // Logique pour assigner le quiz à un étudiant
//     console.log(`Quiz assigné: ${quizId}`);
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold text-center mb-6">Assignation de Quiz</h2>
//       <ul>
//         {quizzes.map(quiz => (
//           <li key={quiz.id} className="flex justify-between items-center border-b py-4">
//             <span>{quiz.title}</span>
//             <button
//               onClick={() => handleAssign(quiz.id)}
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200"
//             >
//               Assigner
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AssignQuiz;