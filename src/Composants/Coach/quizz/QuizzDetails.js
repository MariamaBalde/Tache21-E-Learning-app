import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../Config/firebaseConfig";

const QuizzDetails = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      console.log("Appel Firebase pour récupérer le quiz avec ID:", id);
      try {
        const quizRef = doc(db, "quizzes", id);
        const quizSnapshot = await getDoc(quizRef);
        if (quizSnapshot.exists()) {
          console.log("Données récupérées :", quizSnapshot.data());
          setQuiz({ id: quizSnapshot.id, ...quizSnapshot.data() });
        } else {
          setError("Quiz non trouvé");
        }
      } catch (err) {
        setError("Erreur lors de la récupération du quiz");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">{quiz.title}</h2>
      <p className="text-gray-700 mb-6">{quiz.description}</p>

      {quiz.links && quiz.links.length > 0 ? (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Liens :</h3>
          <ul className="list-disc pl-5">
            {quiz.links.map((link, index) => (
              <li key={`${link.title}-${index}`}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500">Aucun lien disponible pour ce quiz.</p>
      )}
    </div>
  );
};

export default QuizzDetails;
