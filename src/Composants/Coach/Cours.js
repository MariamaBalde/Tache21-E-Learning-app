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

import { FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';

const Cours = () => {
  const { sousDomaineId } = useParams();

  const [cours, setCours] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [associatedQuizzes, setAssociatedQuizzes] = useState([]);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showAddCoursModal, setShowAddCoursModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // Pour différencier entre "ajout" et "modification"
  const [quizToEditId, setQuizToEditId] = useState(null); // ID du quiz à modifier

  const [newCours, setNewCours] = useState({
    name: '',
    description: '',
    link: '',
  });

  const navigate = useNavigate(); // Instancier la fonction navigate

  // Récupérer les cours du sous-domaine
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

  // Récupérer tous les quizzes
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

  // Récupérer les quizzes associés au sous-domaine
  const fetchAssociatedQuizzes = async () => {
    try {
      const assocRef = collection(db, 'sousDomainesQuizzes');
      const q = query(assocRef, where('sousDomaineId', '==', sousDomaineId));
      const querySnapshot = await getDocs(q);

      const assocData = querySnapshot.docs.map((doc) => doc.data());
      const associatedQuizIds = assocData.map((assoc) => assoc.quizId);

      // Filtrer les quizzes associés
      const filteredQuizzes = quizzes.filter((quiz) =>
        associatedQuizIds.includes(quiz.id)
      );
      setAssociatedQuizzes(filteredQuizzes);
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des quizzes associés :',
        error
      );
    }
  };

  useEffect(() => {
    fetchCours();
    // fetchQuizzes();
  }, [sousDomaineId]);

  // useEffect(() => {
  //   if (quizzes.length) fetchAssociatedQuizzes();
  // }, [quizzes]);

  // // Associer un quiz à un sous-domaine
  // const handleAssociateQuiz = async (quizId) => {
  //   try {
  //     const assocRef = collection(db, 'sousDomainesQuizzes');
  //     await addDoc(assocRef, {
  //       sousDomaineId,
  //       quizId,
  //     });
  //     alert('Quiz associé avec succès !');
  //     fetchAssociatedQuizzes();
  //     setShowQuizModal(false);
  //   } catch (error) {
  //     console.error('Erreur lors de l’association du quiz :', error);
  //   }
  // };

  // Ajouter un cours
  const handleAddCours = async () => {
    try {
      const coursRef = collection(db, 'cours');
      await addDoc(coursRef, { ...newCours, sousDomaineId });
      alert('Cours ajouté avec succès !');
      setNewCours({ name: '', description: '', link: '' });
      setShowAddCoursModal(false);
      fetchCours();
    } catch (error) {
      console.error('Erreur lors de l’ajout du cours :', error);
    }
  };

  // Modifier un cours
  const handleEditCours = async (coursId, updatedData) => {
    try {
      const coursDoc = doc(db, 'cours', coursId);
      await updateDoc(coursDoc, updatedData);
      alert('Cours modifié avec succès !');
      fetchCours();
    } catch (error) {
      console.error('Erreur lors de la modification du cours :', error);
    }
  };

  // Archiver un cours
  const handleArchiveCours = async (coursId) => {
    try {
      const coursDoc = doc(db, 'cours', coursId);
      await deleteDoc(coursDoc);
      alert('Cours archivé avec succès !');
      fetchCours();
    } catch (error) {
      console.error('Erreur lors de l’archivage du cours :', error);
    }
  };

  // // Modifier un quiz
  // const handleEditQuiz = async (newQuizId) => {
  //   try {
  //     const assocRef = collection(db, 'sousDomainesQuizzes');
  //     const q = query(
  //       assocRef,
  //       where('sousDomaineId', '==', sousDomaineId),
  //       where('quizId', '==', quizToEditId)
  //     );
  //     const querySnapshot = await getDocs(q);

  //     // Met à jour le document trouvé
  //     if (!querySnapshot.empty) {
  //       const assocDocId = querySnapshot.docs[0].id;
  //       const assocDoc = doc(db, 'sousDomainesQuizzes', assocDocId);
  //       await updateDoc(assocDoc, { quizId: newQuizId });
  //       alert('Quiz modifié avec succès !');
  //       fetchAssociatedQuizzes(); // Recharge les quizzes associés
  //     }

  //     setShowQuizModal(false); // Ferme le modal
  //     setQuizToEditId(null); // Réinitialise l'ID du quiz
  //     setIsEditMode(false); // Désactive le mode édition
  //   } catch (error) {
  //     console.error('Erreur lors de la modification du quiz :', error);
  //   }
  // };

  // // Fonction pour aller sur la page "Jouer" d’un quiz
  // const handlePlayQuiz = (domaineId, sousDomaineId, quizId) => {
  //   navigate(`/domains/${sousDomaineId}/cours/play-quiz/${quizId}`);
  // };

  // const openEditQuizModal = (quizId) => {
  //   setQuizToEditId(quizId); // Définit le quiz à modifier
  //   setIsEditMode(true); // Active le mode édition
  //   setShowQuizModal(true); // Ouvre le modal
  // };

  // Archiver un cours

  // const handleArchiveQuiz = async (quizId) => {
  //   try {
  //     const quizDoc = doc(db, 'quizzes', quizId);
  //     await deleteDoc(quizDoc);
  //     alert('Quiz archivé avec succès !');
  //     fetchAssociatedQuizzes();
  //   } catch (error) {
  //     console.error('Erreur lors de l’archivage du quiz :', error);
  //   }
  // };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Cours du sous-domaine
      </h1>

      <ul className="list-disc pl-5 space-y-4">
        {cours.map((coursItem) => (
          <li key={coursItem.id} className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{coursItem.name}</h3>
                <p className="text-sm text-gray-600">{coursItem.description}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    handleEditCours(coursItem.id, { name: 'Nouveau Nom' })
                  }
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleArchiveCours(coursItem.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* <h2 className="text-xl font-semibold mt-6 text-center text-gray-800">
        Quizzes associés
      </h2>
      <ul className="list-disc pl-5 space-y-4">
        {associatedQuizzes.map((quiz) => (
          <li key={quiz.id} className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <a
                  href={quiz.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-blue-600 hover:underline"
                >
                  {quiz.title}
                </a>
                <p className="text-sm text-gray-600">{quiz.description}</p>
              </div>
              <div className="flex space-x-2">
                <div key={quiz.id}>
                  <h2>{quiz.course}</h2>
                  <button onClick={() => handlePlayQuiz(quiz.id)}>Jouer</button>
                </div>

                <button
                  onClick={() => openEditQuizModal(quiz.id)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => handleArchiveQuiz(quiz.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul> */}

      {/* Bouton pour associer un quiz */}
      {/* <button
        onClick={() => setShowQuizModal(true)}
        className="bg-green-600 text-white px-4 py-2 rounded mt-6"
      >
        Associer un quiz <FaPlus />
      </button> */}

      {/* Modal pour ajouter un cours */}
      <button
        onClick={() => setShowAddCoursModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-6 ml-4"
      >
        Ajouter un cours <FaPlus />
      </button>

      {showAddCoursModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Ajouter un cours</h2>
            <input
              type="text"
              placeholder="Nom"
              value={newCours.name}
              onChange={(e) =>
                setNewCours({ ...newCours, name: e.target.value })
              }
              className="w-full mb-4 p-2 border rounded"
            />
            <textarea
              placeholder="Description"
              value={newCours.description}
              onChange={(e) =>
                setNewCours({ ...newCours, description: e.target.value })
              }
              className="w-full mb-4 p-2 border rounded"
            ></textarea>
            <input
              type="text"
              placeholder="Lien (optionnel)"
              value={newCours.link}
              onChange={(e) =>
                setNewCours({ ...newCours, link: e.target.value })
              }
              className="w-full mb-4 p-2 border rounded"
            />
            <button
              onClick={handleAddCours}
              className="bg-green-600 text-white px-4 py-2 rounded mr-2"
            >
              Ajouter
            </button>
            <button
              onClick={() => setShowAddCoursModal(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Modal pour afficher tous les quizzes disponibles */}
      {/* {showQuizModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              {isEditMode ? 'Modifier le quiz' : 'Associer un quiz'}
            </h2>
            <ul className="space-y-2">
              {quizzes.map((quiz) => (
                <li key={quiz.id} className="flex justify-between items-center">
                  <span>{quiz.title}</span>
                  <button
                    onClick={() =>
                      isEditMode
                        ? handleEditQuiz(quiz.id)
                        : handleAssociateQuiz(quiz.id)
                    }
                    className="bg-blue-600 text-white px-4 py-1 rounded"
                  >
                    {isEditMode ? 'Remplacer' : 'Associer'}
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                setShowQuizModal(false);
                setIsEditMode(false);
                setQuizToEditId(null);
              }}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
            >
              Fermer
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Cours;
