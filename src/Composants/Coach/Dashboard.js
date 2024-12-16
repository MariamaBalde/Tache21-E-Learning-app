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

  const navigate = useNavigate();

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

  const handlePlayQuiz = (quizId) => {
    navigate(`/domains/${sousDomaineId}/cours/play-quiz/${quizId}`);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Titre principal */}
      <h1 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-center text-gray-800">
        Cours et quizzes du sous-domaine
      </h1>

      {/* Section des cours avec responsive Grid */}
      <section className="mb-6">
        <h2 className="text-sm sm:text-md md:text-lg font-semibold mb-3 text-gray-700 text-center">
          Liste des cours
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cours.map((coursItem) => (
            <div
              key={coursItem.id}
              className="p-4 bg-white rounded-lg shadow-md border border-blue-400 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-sm sm:text-base md:text-lg font-semibold truncate mb-2">
                {coursItem.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 truncate mb-2">
                {coursItem.description}
              </p>
              <button
                className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm"
                onClick={() => (window.location.href = coursItem.link)}
              >
                {coursItem.link}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Section des Quiz avec responsive Grid */}
      <section className="mb-6">
        <h2 className="text-sm sm:text-md md:text-lg font-semibold mb-3 text-gray-700 text-center">
          Quizzes associés
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {associatedQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="p-4 bg-white rounded-lg shadow-md border border-blue-400 hover:shadow-lg transition-shadow"
            >
              <a
                href={quiz.link || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs sm:text-sm md:text-base font-semibold text-blue-600 hover:underline mb-2 truncate"
              >
                {quiz.title}
              </a>
              <p className="text-xs sm:text-sm text-gray-600 truncate mb-2">
                {quiz.description}
              </p>
              <div className="flex justify-between space-x-2 mt-2">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => handlePlayQuiz(quiz.id)}
                >
                  <FaPlay />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Boutons d'actions */}
      <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mt-4">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          onClick={() => alert('Associer un quiz')}
        >
          Associer un quiz <FaPlus />
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => alert('Ajouter un cours')}
        >
          Ajouter un cours <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default Cours;
