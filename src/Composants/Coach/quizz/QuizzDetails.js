import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllQuizzes } from './QuizService'; // Importer la fonction pour récupérer tous les quizzes
import { db } from '../../../Config/firebaseConfig';  // Assurez-vous que la configuration Firebase est correcte
import { doc, getDoc } from 'firebase/firestore'; // Importer les méthodes Firestore nécessaires

const QuizzDetails = () => {
  const { id } = useParams(); // Récupérer l'ID du quiz depuis l'URL
  const [quiz, setQuiz] = useState(null); // État pour stocker les détails du quiz
  const [loading, setLoading] = useState(true); // État pour gérer le chargement des données
  const [error, setError] = useState(null); // État pour gérer les erreurs

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quizRef = doc(db, 'quizzes', id); // Référence au quiz dans Firestore
        const quizSnapshot = await getDoc(quizRef); // Récupérer les données du quiz
        if (quizSnapshot.exists()) {
          setQuiz({ id: quizSnapshot.id, ...quizSnapshot.data() }); // Mettre à jour l'état avec les données du quiz
        } else {
          setError('Quiz non trouvé'); // Gestion des erreurs si le quiz n'existe pas
        }
      } catch (err) {
        setError('Erreur lors de la récupération du quiz'); // Gérer l'erreur
      } finally {
        setLoading(false); // Marquer le chargement comme terminé
      }
    };

    fetchQuiz();
  }, [id]); // L'effet est déclenché à chaque fois que l'ID change

  if (loading) {
    return <p>Chargement...</p>; // Afficher un message pendant le chargement
  }

  if (error) {
    return <p>{error}</p>; // Afficher l'erreur si quelque chose va mal
  }

  if (!quiz) {
    return <p>Quiz non disponible</p>; // Afficher un message si le quiz n'est pas trouvé
  }

  return (
    <div>
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>
      {/* Tu peux ajouter d'autres détails du quiz ici */}
      <h3>Questions :</h3>
      {/* Tu peux ajouter une liste des questions du quiz ici si tu les récupères depuis Firestore */}
    </div>
  );
};

export default QuizzDetails;
