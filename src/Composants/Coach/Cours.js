// import { useParams } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { db } from '../../Config/firebaseConfig';
// import {
//   collection,
//   getDocs,
//   addDoc,
//   doc,
//   query,
//   where,
//   updateDoc,
//   deleteDoc,
// } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';

// import { FaPlus, FaEdit, FaTrashAlt, FaPlay, FaArchive } from 'react-icons/fa';

// const Cours = () => {
//   const { sousDomaineId } = useParams();

//   const [cours, setCours] = useState([]);
//   const [quizzes, setQuizzes] = useState([]);
//   const [associatedQuizzes, setAssociatedQuizzes] = useState([]);
//   const [showQuizModal, setShowQuizModal] = useState(false);
//   const [showAddCoursModal, setShowAddCoursModal] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false); // Pour différencier entre "ajout" et "modification"
//   const [quizToEditId, setQuizToEditId] = useState(null); // ID du quiz à modifier

//   const [newCours, setNewCours] = useState({
//     name: '',
//     description: '',
//     link: '',
//   });

//   const navigate = useNavigate(); // Instancier la fonction navigate

//   // Récupérer les cours du sous-domaine
//   const fetchCours = async () => {
//     try {
//       const coursRef = collection(db, 'cours');
//       const q = query(coursRef, where('sousDomaineId', '==', sousDomaineId));
//       const querySnapshot = await getDocs(q);
//       const coursData = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setCours(coursData);
//     } catch (error) {
//       console.error('Erreur lors de la récupération des cours :', error);
//     }
//   };

//   // Récupérer tous les quizzes
//   const fetchQuizzes = async () => {
//     try {
//       const quizzesRef = collection(db, 'quizzes');
//       const querySnapshot = await getDocs(quizzesRef);
//       const quizzesData = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setQuizzes(quizzesData);
//     } catch (error) {
//       console.error('Erreur lors de la récupération des quizzes :', error);
//     }
//   };

//   // Récupérer les quizzes associés au sous-domaine
//   const fetchAssociatedQuizzes = async () => {
//     try {
//       const assocRef = collection(db, 'sousDomainesQuizzes');
//       const q = query(assocRef, where('sousDomaineId', '==', sousDomaineId));
//       const querySnapshot = await getDocs(q);

//       const assocData = querySnapshot.docs.map((doc) => doc.data());
//       const associatedQuizIds = assocData.map((assoc) => assoc.quizId);

//       // Filtrer les quizzes associés
//       const filteredQuizzes = quizzes.filter((quiz) =>
//         associatedQuizIds.includes(quiz.id)
//       );
//       setAssociatedQuizzes(filteredQuizzes);
//     } catch (error) {
//       console.error(
//         'Erreur lors de la récupération des quizzes associés :',
//         error
//       );
//     }
//   };

//   useEffect(() => {
//     fetchCours();
//     fetchQuizzes();
//   }, [sousDomaineId]);

//   useEffect(() => {
//     if (quizzes.length) fetchAssociatedQuizzes();
//   }, [quizzes]);

//   // Associer un quiz à un sous-domaine
//   const handleAssociateQuiz = async (quizId) => {
//     try {
//       const assocRef = collection(db, 'sousDomainesQuizzes');
//       await addDoc(assocRef, {
//         sousDomaineId,
//         quizId,
//       });
//       alert('Quiz associé avec succès !');
//       fetchAssociatedQuizzes();
//       setShowQuizModal(false);
//     } catch (error) {
//       console.error('Erreur lors de l’association du quiz :', error);
//     }
//   };

//   // Ajouter un cours
//   const handleAddCours = async () => {
//     try {
//       const coursRef = collection(db, 'cours');
//       await addDoc(coursRef, { ...newCours, sousDomaineId });
//       alert('Cours ajouté avec succès !');
//       setNewCours({ name: '', description: '', link: '' });
//       setShowAddCoursModal(false);
//       fetchCours();
//     } catch (error) {
//       console.error('Erreur lors de l’ajout du cours :', error);
//     }
//   };

//   // Modifier un cours
//   const handleEditCours = async (coursId, updatedData) => {
//     try {
//       const coursDoc = doc(db, 'cours', coursId);
//       await updateDoc(coursDoc, updatedData);
//       alert('Cours modifié avec succès !');
//       fetchCours();
//     } catch (error) {
//       console.error('Erreur lors de la modification du cours :', error);
//     }
//   };

//   // Archiver un cours
//   const handleArchiveCours = async (coursId) => {
//     try {
//       const coursDoc = doc(db, 'cours', coursId);
//       await deleteDoc(coursDoc);
//       alert('Cours archivé avec succès !');
//       fetchCours();
//     } catch (error) {
//       console.error('Erreur lors de l’archivage du cours :', error);
//     }
//   };

//   // Modifier un quiz
//   const handleEditQuiz = async (newQuizId) => {
//     try {
//       const assocRef = collection(db, 'sousDomainesQuizzes');
//       const q = query(
//         assocRef,
//         where('sousDomaineId', '==', sousDomaineId),
//         where('quizId', '==', quizToEditId)
//       );
//       const querySnapshot = await getDocs(q);

//       // Met à jour le document trouvé
//       if (!querySnapshot.empty) {
//         const assocDocId = querySnapshot.docs[0].id;
//         const assocDoc = doc(db, 'sousDomainesQuizzes', assocDocId);
//         await updateDoc(assocDoc, { quizId: newQuizId });
//         alert('Quiz modifié avec succès !');
//         fetchAssociatedQuizzes(); // Recharge les quizzes associés
//       }

//       setShowQuizModal(false); // Ferme le modal
//       setQuizToEditId(null); // Réinitialise l'ID du quiz
//       setIsEditMode(false); // Désactive le mode édition
//     } catch (error) {
//       console.error('Erreur lors de la modification du quiz :', error);
//     }
//   };

//   // Supprimer un quiz associé
//   const handleDeleteQuiz = async (quizId) => {
//     try {
//       const assocRef = collection(db, 'sousDomainesQuizzes');
//       const q = query(
//         assocRef,
//         where('sousDomaineId', '==', sousDomaineId),
//         where('quizId', '==', quizId)
//       );
//       const querySnapshot = await getDocs(q);

//       // Vérifie s'il y a un document correspondant
//       if (!querySnapshot.empty) {
//         const assocDocId = querySnapshot.docs[0].id; // Récupère l'ID du document
//         const assocDoc = doc(db, 'sousDomainesQuizzes', assocDocId);

//         // Supprime le document
//         await deleteDoc(assocDoc);

//         alert('Quiz supprimé avec succès !');
//         fetchAssociatedQuizzes(); // Recharge la liste des quizzes associés
//       } else {
//         alert('Aucune association trouvée pour ce quiz.');
//       }
//     } catch (error) {
//       console.error('Erreur lors de la suppression du quiz :', error);
//     }
//   };

//   // Fonction pour aller sur la page "Jouer" d’un quiz
//   const handlePlayQuiz = (domaineId, sousDomaineId, quizId) => {
//     navigate(`/domains/${sousDomaineId}/cours/play-quiz/${quizId}`);
//   };

//   const openEditQuizModal = (quizId) => {
//     setQuizToEditId(quizId); // Définit le quiz à modifier
//     setIsEditMode(true); // Active le mode édition
//     setShowQuizModal(true); // Ouvre le modal
//   };

//   // Archiver un cours

//   const handleArchiveQuiz = async (quizId) => {
//     try {
//       const quizDoc = doc(db, 'quizzes', quizId);
//       await deleteDoc(quizDoc);
//       alert('Quiz archivé avec succès !');
//       fetchAssociatedQuizzes();
//     } catch (error) {
//       console.error('Erreur lors de l’archivage du quiz :', error);
//     }
//   };

//   return (
//     <div className="p-2 sm:p-4 md:p-6">
//       <h1 className="text-xs sm:text-sm md:text-2xl font-semibold mb-3 sm:mb-4 md:mb-6 text-center text-gray-800">
//         Cours du sous-domaine
//       </h1>
  
//       <ul className="space-y-2 sm:space-y-4">
//         {cours.map((coursItem) => (
//           <li
//             key={coursItem.id}
//             className="p-3 sm:p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-blue-600"
//           >
//             <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
//               <div className="w-full sm:w-auto">
//                 <h3 className="text-xs sm:text-sm md:text-base font-semibold">
//                   {coursItem.name}
//                 </h3>
//                 <p className="text-xs sm:text-sm text-gray-600">
//                   {coursItem.description}
//                 </p>
//                 <button
//                   className="block mt-1 text-xs sm:text-sm text-blue-600 hover:text-blue-800 break-words"
//                   onClick={() => (window.location.href = coursItem.link)}
//                 >
//                   {coursItem.link}
//                 </button>
//               </div>
//               <div className="flex space-x-2 mt-2 sm:mt-0">
//                 <button
//                   onClick={() =>
//                     handleEditCours(coursItem.id, { name: 'Nouveau Nom' })
//                   }
//                   className="text-blue-600 hover:text-blue-800"
//                 >
//                   <FaEdit />
//                 </button>
//                 <button
//                   onClick={() => handleArchiveCours(coursItem.id)}
//                   className="text-red-600 hover:text-red-800"
//                 >
//                   <FaArchive />
//                 </button>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
  
//       <h2 className="text-xs sm:text-sm md:text-2xl font-semibold my-4 sm:my-6 text-center text-gray-800">
//         Quizzes associés
//       </h2>
//       <ul className="space-y-2 sm:space-y-4">
//         {associatedQuizzes.map((quiz) => (
//           <li
//             key={quiz.id}
//             className="p-3 sm:p-4 bg-white rounded-lg shadow-md"
//           >
//             <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
//               <div className="w-full sm:w-auto">
//                 <a
//                   href={quiz.link || '#'}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="block text-xs sm:text-sm md:text-base font-semibold text-blue-600 hover:underline"
//                 >
//                   {quiz.title}
//                 </a>
//                 <p className="text-xs sm:text-sm text-gray-600">
//                   {quiz.description}
//                 </p>
//               </div>
//               <div className="flex space-x-2 mt-2 sm:mt-0">
//                 <button
//                   onClick={() => handlePlayQuiz(quiz.id)}
//                   className="text-blue-600 hover:text-blue-800"
//                   title="Jouer au quiz"
//                 >
//                   <FaPlay />
//                 </button>
//                 <button
//                   onClick={() => openEditQuizModal(quiz.id)}
//                   className="text-blue-600 hover:text-blue-800"
//                   title="Éditer le quiz"
//                 >
//                   <FaEdit />
//                 </button>
//                 <button
//                   onClick={() => handleArchiveQuiz(quiz.id)}
//                   className="text-red-600 hover:text-red-800"
//                   title="Archiver le quiz"
//                 >
//                   <FaArchive />
//                 </button>
//                 <button
//                   onClick={() => handleDeleteQuiz(quiz.id)}
//                   className="text-red-600 hover:text-red-800"
//                   title="Supprimer le quiz"
//                 >
//                   <FaTrashAlt />
//                 </button>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
  
//       <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-6">
//         <button
//           onClick={() => setShowQuizModal(true)}
//           className="bg-green-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded w-full sm:w-auto text-xs sm:text-sm md:text-base"
//         >
//           Associer un quiz <FaPlus />
//         </button>
//         <button
//           onClick={() => setShowAddCoursModal(true)}
//           className="bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded w-full sm:w-auto text-xs sm:text-sm md:text-base"
//         >
//           Ajouter un cours <FaPlus />
//         </button>
//       </div>
//     </div>
//   );

  
// };

// export default Cours;





import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../../Config/firebaseConfig';
import {
  collection,
  getDocs,
  addDoc,
  doc,
  query,
  where,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrashAlt, FaPlay, FaArchive } from 'react-icons/fa';

const Cours = () => {
  const { sousDomaineId } = useParams();
  const [cours, setCours] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [associatedQuizzes, setAssociatedQuizzes] = useState([]);

  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showAddCoursModal, setShowAddCoursModal] = useState(false);

  const navigate = useNavigate();

  // Fonction pour récupérer les cours
  const fetchCours = async () => {
    try {
      const coursRef = collection(db, 'cours');
      const q = query(coursRef, where('sousDomaineId', '==', sousDomaineId));
      const querySnapshot = await getDocs(q);
      const coursData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCours(coursData);
    } catch (error) {
      console.error('Erreur lors de la récupération des cours :', error);
    }
  };

  // Récupérer les quizzes
  const fetchQuizzes = async () => {
    try {
      const quizzesRef = collection(db, 'quizzes');
      const querySnapshot = await getDocs(quizzesRef);
      const quizzesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuizzes(quizzesData);
    } catch (error) {
      console.error('Erreur lors de la récupération des quizzes :', error);
    }
  };

  useEffect(() => {
    fetchCours();
    fetchQuizzes();
  }, [sousDomaineId]);

  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Titre principal */}
      <h1 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-center text-gray-800">
        Cours du sous-domaine
      </h1>
      
      {/* Liste des cours */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {cours.map((coursItem) => (
          <div
            key={coursItem.id}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-blue-400"
          >
            <h3 className="text-sm sm:text-base font-semibold mb-2">
              {coursItem.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-2">
              {coursItem.description}
            </p>
            <a
              href={coursItem.link}
              className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 break-words"
            >
              {coursItem.link}
            </a>
            <div className="flex justify-between items-center mt-2 space-x-2">
              <button
                onClick={() => alert('Modifier le cours')}
                className="text-blue-600 hover:text-blue-800"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => alert('Archiver le cours')}
                className="text-red-600 hover:text-red-800"
              >
                <FaArchive />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Section Quizzes */}
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 text-center text-gray-800">
        Quizzes associés
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {associatedQuizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-sm sm:text-base font-semibold text-blue-600">
              {quiz.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-2">{quiz.description}</p>
            <button
              onClick={() => navigate(`/domains/${sousDomaineId}/cours/play-quiz/${quiz.id}`)}
              className="flex items-center text-blue-600 hover:text-blue-800 space-x-1"
            >
              <FaPlay />
              <span>Jouer</span>
            </button>
          </div>
        ))}
      </div>

      {/* Boutons */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
        <button
          onClick={() => setShowQuizModal(true)}
          className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded text-sm"
        >
          Associer un quiz <FaPlus />
        </button>
        <button
          onClick={() => setShowAddCoursModal(true)}
          className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded text-sm"
        >
          Ajouter un cours <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default Cours;
