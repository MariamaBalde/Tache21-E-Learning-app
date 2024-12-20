import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import {  ArchiveBoxIcon} from '@heroicons/react/24/outline';
import { FaPlus, FaEdit,  FaPlay } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importer les styles de Toastify

const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
  </div>
);

const Cours = () => {
  const { sousDomaineId } = useParams();
  const [cours, setCours] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [associatedQuizzes, setAssociatedQuizzes] = useState([]);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showAddCoursModal, setShowAddCoursModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // Pour différencier entre "ajout" et "modification"
  const [showEditCoursModal, setShowEditCoursModal] = useState(false);
  const [coursToEdit, setCoursToEdit] = useState(null);
  const [quizToEditId, setQuizToEditId] = useState(null); // ID du quiz à modifier
  const [newCours, setNewCours] = useState({
    name: '',
    description: '',
    link: '',
  });

  const [loading, setLoading] = useState(false); // État pour le loader

  const navigate = useNavigate(); // Instancier la fonction navigate

  // Récupérer les cours du sous-domaine
  // const fetchCours = async () => {
  //   try {
  //     const coursRef = collection(db, 'cours');
  //     const q = query(coursRef, where('sousDomaineId', '==', sousDomaineId));
  //     const querySnapshot = await getDocs(q);
  //     const coursData = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setCours(coursData);
  //   } catch (error) {
  //     console.error('Erreur lors de la récupération des cours :', error);
  //   }finally { //pour loader
  //     setLoading(false);
  //   }
  // };
  const fetchCours = async () => {
    setLoading(true); // Active le loader au début
    try {
      const coursRef = collection(db, 'cours');
      const q = query(coursRef, where('sousDomaineId', '==', sousDomaineId));
      const querySnapshot = await getDocs(q);
      const coursData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt ? data.createdAt.toDate().toLocaleString() : 'Non défini',
        };
      });
      setCours(coursData);
    } catch (error) {
      console.error('Erreur lors de la récupération des cours :', error);
    } finally {
      setLoading(false); // Désactive le loader à la fin
    }
  };


 
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
    }finally {  //pour loader
      setLoading(false);
    }
  };

  // Récupérer les quizzes associés au sous-domaine
  const fetchAssociatedQuizzes = async () => {
    setLoading(true); //pour loader
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
    }finally { //pour le loader
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCours();
    fetchQuizzes();
  }, [sousDomaineId]);

  useEffect(() => {
    if (quizzes.length) fetchAssociatedQuizzes();
  }, [quizzes]);

  // Associer un quiz à un sous-domaine
  const handleAssociateQuiz = async (quizId) => {
    try {
      const assocRef = collection(db, 'sousDomainesQuizzes');
      await addDoc(assocRef, {
        sousDomaineId,
        quizId,
      });
      toast.success('Quiz associé avec succès !');
      fetchAssociatedQuizzes();
      setShowQuizModal(false);
    } catch (error) {
      console.error('Erreur lors de l’association du quiz :', error);
      toast.error('Erreur lors de l\'association du quiz.');
    }
  };

  // Ajouter un cours
  const handleAddCours = async () => {
    setLoading(true);
    try {
      const coursRef = collection(db, 'cours');
      await addDoc(coursRef, { ...newCours, sousDomaineId });
      toast.success('Cours ajouté avec succès !');
      setNewCours({ name: '', description: '', link: '' });
      setShowAddCoursModal(false);
      fetchCours();
    } catch (error) {
      console.error('Erreur lors de l’ajout du cours :', error);
      toast.error('Erreur lors de l\'ajout du cours.');
    } finally { //pour le loader
      setLoading(false);
    }
  };
  const editCours = (cours) => {
    setCoursToEdit(cours);
    setShowEditCoursModal(true);
  };
  // Modifier un cours
  const handleEditCours = async (e) => {
    e.preventDefault();

    if (!coursToEdit.name.trim()) {
      alert('Le nom du domaine est obligatoire.');
      return;
    }

    try {
      await updateDoc(doc(db, 'cours', coursToEdit.id), {
        name: coursToEdit.name.trim(),
        description: coursToEdit.description?.trim() || '',
        link: coursToEdit.link?.trim() || '',
      });
      toast.success('Cours modifié avec succès !');
      setShowEditCoursModal(false);
      fetchCours();
    } catch (error) {
      console.error('Erreur lors de la modification du domaine :', error);
      toast.error('Erreur lors de la modification du cours.');

    }
  };

  // Archiver un cours
  const handleArchiveCours = async (coursId) => {
    setLoading(true);
    try {
      const coursDoc = doc(db, 'cours', coursId);
      await deleteDoc(coursDoc);
      toast.success('Cours archivé avec succès !');
      fetchCours();
    } catch (error) {
      console.error('Erreur lors de l’archivage du cours :', error);
      toast.error('Erreur lors de l\'archivage du cours.');
    } finally { //pour le loader
      setLoading(false);
    }
  };

  // Modifier un quiz
  const handleEditQuiz = async (newQuizId) => {
    try {
      const assocRef = collection(db, 'sousDomainesQuizzes');
      const q = query(
        assocRef,
        where('sousDomaineId', '==', sousDomaineId),
        where('quizId', '==', quizToEditId)
      );
      const querySnapshot = await getDocs(q);

      // Met à jour le document trouvé
      if (!querySnapshot.empty) {
        const assocDocId = querySnapshot.docs[0].id;
        const assocDoc = doc(db, 'sousDomainesQuizzes', assocDocId);
        await updateDoc(assocDoc, { quizId: newQuizId });
        toast.success('Quiz modifié avec succès !');
        fetchAssociatedQuizzes(); // Recharge les quizzes associés
      }

      setShowQuizModal(false); // Ferme le modal
      setQuizToEditId(null); // Réinitialise l'ID du quiz
      setIsEditMode(false); // Désactive le mode édition
    } catch (error) {
      console.error('Erreur lors de la modification du quiz :', error);
      toast.error('Erreur lors de la modification du quiz.');

    }
  };

  // Supprimer un quiz associé
  const handleDeleteQuiz = async (quizId) => {
    try {
      const assocRef = collection(db, 'sousDomainesQuizzes');
      const q = query(
        assocRef,
        where('sousDomaineId', '==', sousDomaineId),
        where('quizId', '==', quizId)
      );
      const querySnapshot = await getDocs(q);

      // Vérifie s'il y a un document correspondant
      if (!querySnapshot.empty) {
        const assocDocId = querySnapshot.docs[0].id; // Récupère l'ID du document
        const assocDoc = doc(db, 'sousDomainesQuizzes', assocDocId);

        // Supprime le document
        await deleteDoc(assocDoc);

        toast.success('Quiz supprimé avec succès !');
        fetchAssociatedQuizzes(); // Recharge la liste des quizzes associés
      } else {
        toast.error('Aucune association trouvée pour ce quiz.');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du quiz :', error);
      toast.error('Erreur lors de la suppression du quiz.');
    }
  };

  // Fonction pour aller sur la page "Jouer" d’un quiz
  const handlePlayQuiz = (domaineId, sousDomaineId, quizId) => {
    navigate(`/domains/${sousDomaineId}/cours/play-quiz/${quizId}`);
  };

  const openEditQuizModal = (quizId) => {
    setQuizToEditId(quizId); // Définit le quiz à modifier
    setIsEditMode(true); // Active le mode édition
    setShowQuizModal(true); // Ouvre le modal
  };

  // Archiver un cours

  const handleArchiveQuiz = async (quizId) => {
    try {
      const quizDoc = doc(db, 'quizzes', quizId);
      await deleteDoc(quizDoc);
      toast.success('Quiz archivé avec succès !');
      fetchAssociatedQuizzes();
    } catch (error) {
      console.error('Erreur lors de l’archivage du quiz :', error);
    }
  };

  return (
    <>
    <ToastContainer />
    <div className="px-6">
      {loading && <Loader />}  {/*pour le loader*/}
      <h1 className="text-2xl font-bold mb-6 text-start text-blue-600">
        Cours du sous-domaine
      </h1>
      {/* Liste des cours */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {cours.map((cours) => (
          <div
            key={cours.id}
            className="flex flex-col justify-between h-full p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-blue-400"
          >
            {/* Conteneur Titre */}
            <div className="mb-2">
              <h3 className="text-sm sm:text-base font-semibold text-blue-600">
                {cours.name}
              </h3>
            </div>

            {/* Conteneur Description */}
            <div className="mb-2">
              <p className="text-xs sm:text-sm text-gray-600">
                {cours.description}
              </p>
            </div>

            {/* Conteneur Lien */}
            <div className="mb-4">
              <a
                href={cours.link}
                className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 break-words"
              >
                {cours.link}
              </a>
            </div>

            {/* Conteneur Boutons */}
            <div className="flex justify-between items-center space-x-2 mt-auto">
              <Link
                onClick={() => editCours(cours)}
                className="relative group p-2 text-blue-600 hover:bg-blue-100 rounded-md transition"
                title="Modifier"
              >
                <FaEdit className="h-6 w-6" />
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-sm bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  Modifier
                </span>
              </Link>
              <button
                onClick={() => handleArchiveCours(cours.id)}
                className="relative group p-2 text-red-600 hover:bg-red-100 rounded-md transition"
                title="Archiver"
              >
                <ArchiveBoxIcon className="h-6 w-6" />
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-sm bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  Archiver

                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Section Quizzes */}
      <p className="text-lg sm:text-xl md:text-2xl font-bold mb-3 text-start text-blue-600">
        Quizzes associés
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {associatedQuizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <a
              href={quiz.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-blue-600 no-underline"
            >
              {quiz.title}
            </a>
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
          className="w-full sm:w-auto bg-blue-900 text-white px-4 py-2 rounded text-sm"
        >
          Associer un quiz <FaPlus />
        </button>
        <button
          onClick={() => setShowAddCoursModal(true)}
          className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded text-sm"
        >
          Ajouter un cours <FaPlus />
        </button>
        {showAddCoursModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-lg font-semibold mb-4 text-blue-600">Ajouter un cours</h2>
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
                className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
              >
                Ajouter
              </button>
              <button
                onClick={() => setShowAddCoursModal(false)}
                className="bg-blue-900 text-white px-4 py-2 rounded"
              >
                Annuler
              </button>
            </div>
          </div>
        )}
        {/* Modal pour afficher tous les quizzes disponibles */}
        {showQuizModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-lg font-semibold mb-4 text-blue-600">
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
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              >
                Fermer
              </button>
            </div>
          </div>
        )}
        {/* Modal for Editing Cours */}
        {showEditCoursModal && coursToEdit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
              <h2 className="text-xl font-semibold mb-4">Modifier le Cour</h2>
              <form onSubmit={handleEditCours}>
                <input
                  type="text"
                  value={coursToEdit.name || ''}
                  onChange={(e) =>
                    setCoursToEdit({ ...coursToEdit, name: e.target.value })
                  }
                  className="border rounded w-full px-4 py-2 mb-4"
                  placeholder="Nom du cours"
                />
                <textarea
                  value={coursToEdit.description || ''}
                  onChange={(e) =>
                    setCoursToEdit({ ...coursToEdit, description: e.target.value })
                  }
                  className="border rounded w-full px-4 py-2 mb-4"
                  placeholder="Description du cours"
                />
                <input
                  type="text"
                  value={coursToEdit.link || ''}
                  onChange={(e) =>
                    setCoursToEdit({ ...coursToEdit, link: e.target.value })
                  }
                  className="border rounded w-full px-4 py-2 mb-4"
                  placeholder="Lien du cours"
                />
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Sauvegarder
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditCoursModal(false)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Cours;