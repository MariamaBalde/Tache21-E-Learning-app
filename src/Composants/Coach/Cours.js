import React, { useState, useEffect } from 'react';
import { db } from '../../Config/firebaseConfig';
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc,
  addDoc,
} from 'firebase/firestore';
import { ArchiveIcon, TrashIcon, PencilIcon } from '@heroicons/react/solid';
import { useParams } from 'react-router-dom';

const CoursesList = () => {
  const { sousDomaineId } = useParams(); // Récupérer l'ID du sous-domaine depuis l'URL
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [otherLink, setOtherLink] = useState('');

  // Récupérer les cours associés à un sous-domaine
  const fetchCourses = async () => {
    if (!sousDomaineId) {
      console.error('sousDomaineId est indéfini ou null');
      setError(new Error("L'ID du sous-domaine est requis."));
      setLoading(false);
      return;
    }

    try {
      const coursesRef = collection(db, 'cours');
      const q = query(coursesRef, where('sousDomaineId', '==', sousDomaineId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log('Aucun cours trouvé pour cet ID de sous-domaine');
      }

      const coursesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log('Cours récupérés:', coursesData); // Ajouter ici pour vérifier les données récupérées
      setCourses(coursesData);
      setLoading(false);
    } catch (err) {
      console.error('Erreur lors de la récupération des cours:', err);
      setError(err);
      setLoading(false);
    }
  };

  // Fonction pour créer un cours
  const createCourse = async () => {
    try {
      await addDoc(collection(db, 'cours'), {
        name: courseName,
        description: courseDescription,
        sousDomaineId,
        archived: false,
        youtubeLink,
        otherLink,
      });
      setCourseName('');
      setCourseDescription('');
      setYoutubeLink('');
      setOtherLink('');
      fetchCourses(); // Recharge la liste des cours après l'ajout
    } catch (err) {
      console.error('Erreur lors de la création du cours:', err);
    }
  };

  // Fonction pour archiver ou désarchiver un cours
  const toggleArchiveCourse = async (courseId, isArchived) => {
    try {
      const courseRef = doc(db, 'cours', courseId);
      await updateDoc(courseRef, { archived: !isArchived });
      fetchCourses(); // Recharge la liste des cours après modification
    } catch (err) {
      console.error("Erreur lors de l'archivage du cours:", err);
    }
  };

  // Fonction pour supprimer un cours
  const deleteCourse = async (courseId) => {
    try {
      const courseRef = doc(db, 'cours', courseId);
      await deleteDoc(courseRef);
      fetchCourses(); // Recharge la liste des cours après suppression
    } catch (err) {
      console.error('Erreur lors de la suppression du cours:', err);
    }
  };

  // Fonction pour sélectionner un cours et le modifier
  const editCourse = (course) => {
    setSelectedCourse(course);
    setCourseName(course.name);
    setCourseDescription(course.description);
    setYoutubeLink(course.youtubeLink || '');
    setOtherLink(course.otherLink || '');
  };

  // Fonction pour mettre à jour un cours
  const updateCourse = async () => {
    try {
      const courseRef = doc(db, 'cours', selectedCourse.id);
      await updateDoc(courseRef, {
        name: courseName,
        description: courseDescription,
        youtubeLink,
        otherLink,
      });
      setSelectedCourse(null);
      setCourseName('');
      setCourseDescription('');
      setYoutubeLink('');
      setOtherLink('');
      fetchCourses(); // Recharge la liste des cours après modification
    } catch (err) {
      console.error('Erreur lors de la mise à jour du cours:', err);
    }
  };

  // Charger les cours au premier rendu
  useEffect(() => {
    fetchCourses();
  }, [sousDomaineId]);

  if (loading) {
    return <div className="text-center">Chargement des cours...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">Erreur : {error.message}</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Cours du Sous-Domaine
      </h1>

      {/* Formulaire pour ajouter un nouveau cours */}
      <div className="mb-6">
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          placeholder="Nom du cours"
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <textarea
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
          placeholder="Description du cours"
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        ></textarea>
        <input
          type="text"
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
          placeholder="Lien YouTube (optionnel)"
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          value={otherLink}
          onChange={(e) => setOtherLink(e.target.value)}
          placeholder="Autre lien (optionnel)"
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <button
          onClick={createCourse}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Ajouter Cours
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
            <p className="text-gray-600">{course.description}</p>

            {/* Affichage des liens YouTube et autres */}
            {course.youtubeLink && (
              <div className="mt-2">
                <a
                  href={course.youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Voir sur YouTube
                </a>
              </div>
            )}
            {course.otherLink && (
              <div className="mt-2">
                <a
                  href={course.otherLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Voir sur une autre plateforme
                </a>
              </div>
            )}

            {/* Boutons pour voir les détails, archiver, ou supprimer */}
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => editCourse(course)}
                className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 transition duration-300"
              >
                <PencilIcon className="h-5 w-5 text-white" />
              </button>

              <button
                onClick={() => toggleArchiveCourse(course.id, course.archived)}
                className={`p-2 rounded-lg text-white hover:bg-opacity-80 transition duration-300 ${
                  course.archived ? 'bg-green-500' : 'bg-yellow-500'
                }`}
              >
                {course.archived ? 'Restaurer' : 'Archiver'}
              </button>

              <button
                onClick={() => deleteCourse(course.id)}
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300"
              >
                <TrashIcon className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesList;
