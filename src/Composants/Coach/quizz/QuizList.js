import React, { useEffect, useState } from 'react';
import { db } from '../../../Config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import QuizCard from './QuizCard'; // Assurez-vous que le chemin est correct
import { toggleArchiveQuiz } from './QuizService';
import Loader from '../../Shared/Loader'; // Assurez-vous d'importer le loader

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true); // Ajoute l'état de chargement

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
      alert(newArchivedState ? 'Quiz archivé !' : 'Quiz désarchivé !');
    } catch (error) {
      console.error("Erreur lors de l'archivage :", error);
    }
  };

  if (loading) {
    return <Loader />; // Affiche le loader pendant le chargement
  }

  return (
    <div className="px-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Liste des Quiz</h2>

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

// const QuizList = () => {
//   const [quizzes, setQuizzes] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       setLoading(true); // Commence le chargement
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

//   if (loading) {
//     return <div className="text-center mt-10">Chargement...</div>;
//   }

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Liste des Quiz</h2>

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
