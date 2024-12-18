import React, { useEffect, useState } from 'react';
import { db } from '../../../Config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import QuizCard from './QuizCard'; // Assurez-vous que le chemin est correct
import { toggleArchiveQuiz } from './QuizService';
import Loader from '../../Shared/Loader'; // Assurez-vous d'importer le loader
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import { toast } from 'react-toastify'; // Importation de Toastify

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true); // Ajoute l'état de chargement
  const navigate = useNavigate(); // Initialiser useNavigate

  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true); // Démarre le chargement des données
      try {
        const querySnapshot = await getDocs(collection(db, 'quizzes'));
        const quizList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuizzes(quizList);
      } catch (error) {
        console.error('Erreur lors de la récupération des quiz :', error);
        toast.error('Erreur lors de la récupération des quiz.'); // Notification Toastify pour erreur
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    fetchQuizzes();
  }, []);

  const handleToggleArchive = async (id, archived) => {
    try {
      const newArchivedState = await toggleArchiveQuiz(id, archived);
      setQuizzes((prevQuizzes) =>
        prevQuizzes.map((quiz) =>
          quiz.id === id ? { ...quiz, archived: newArchivedState } : quiz
        )
      );
      toast.success(newArchivedState ? 'Quiz archivé !' : 'Quiz désarchivé !'); // Notification Toastify pour succès
    } catch (error) {
      console.error("Erreur lors de l'archivage :", error);
      toast.error('Erreur lors de l\'archivage du quiz.'); // Notification Toastify pour erreur
    }
  };

  const handleAddQuiz = () => {
    navigate('/coach/dashboard/quizzes/add-quiz'); // Redirige vers la page d'ajout de quiz
  };

  if (loading) {
    return <Loader />; // Affiche le loader pendant le chargement
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Liste des Quiz</h2>

      <button
        onClick={handleAddQuiz}
        className="mb-4 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-800"
      >
        Ajouter un Quiz
      </button>

      {quizzes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              onToggleArchive={handleToggleArchive}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Aucun quiz disponible.</p>
      )}
    </div>
  );
};

export default QuizList;




// import React, { useEffect, useState } from 'react';
// import { db } from '../../../Config/firebaseConfig';
// import { collection, getDocs } from 'firebase/firestore';
// import QuizCard from './QuizCard'; // Assurez-vous que le chemin est correct
// import { toggleArchiveQuiz } from './QuizService';
// import Loader from '../../Shared/Loader'; // Assurez-vous d'importer le loader
// import { useNavigate } from 'react-router-dom'; // Importer useNavigate

// const QuizList = () => {
//   const [quizzes, setQuizzes] = useState([]);
//   const [loading, setLoading] = useState(true); // Ajoute l'état de chargement
//   const navigate = useNavigate(); // Initialiser useNavigate

//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       setLoading(true); // Démarre le chargement des données
//       try {
//         const querySnapshot = await getDocs(collection(db, 'quizzes'));
//         const quizList = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setQuizzes(quizList);
//       } catch (error) {
//         console.error('Erreur lors de la récupération des quiz :', error);
//       } finally {
//         setLoading(false); // Fin du chargement
//       }
//     };

//     fetchQuizzes();
//   }, []);

//   const handleToggleArchive = async (id, archived) => {
//     try {
//       const newArchivedState = await toggleArchiveQuiz(id, archived);
//       setQuizzes((prevQuizzes) =>
//         prevQuizzes.map((quiz) =>
//           quiz.id === id ? { ...quiz, archived: newArchivedState } : quiz
//         )
//       );
//       alert(newArchivedState ? 'Quiz archivé !' : 'Quiz désarchivé !');
//     } catch (error) {
//       console.error("Erreur lors de l'archivage :", error);
//     }
//   };

//   const handleAddQuiz = () => {
//     navigate('/coach/dashboard/quizzes/add-quiz'); // Redirige vers la page d'ajout de quiz
//   };

//   if (loading) {
//     return <Loader />; // Affiche le loader pendant le chargement
//   }

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6 text-blue-800">Liste des Quiz</h2>

//       <button
//         onClick={handleAddQuiz}
//         className="mb-4 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-800"
//       >
//         Ajouter un Quiz
//       </button>

//       {quizzes.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {quizzes.map((quiz) => (
//             <QuizCard
//               key={quiz.id}
//               quiz={quiz}
//               onToggleArchive={handleToggleArchive}
//             />
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500">Aucun quiz disponible.</p>
//       )}
//     </div>
//   );
// };

// export default QuizList;
