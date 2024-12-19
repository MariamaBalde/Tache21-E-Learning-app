import { useState, useEffect } from "react";
import { doc, getDoc, collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { auth, db } from "../../Config/firebaseConfig"; // Assurez-vous que le chemin est correct
import Loader from "../Shared/Loader"; // Import du composant Loader
import Toastify from "toastify-js";

import { toast } from "react-toastify"; // Import de Toastify pour les notifications
import { PlayIcon } from "@heroicons/react/24/solid";
// Fonction utilitaire pour les notifications Toastify
const showToast = (message, type = "success") => {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: type === "error" ? "#FF0000" : "#333",
  }).showToast();
};
const TachesEtudiant = () => {
  const [studentData, setStudentData] = useState(null);
  const [subDomains, setSubDomains] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      const studentId = user.uid;

      const fetchStudentData = async () => {
        try {
          const studentRef = doc(db, "users", studentId);
          const studentSnapshot = await getDoc(studentRef);

          if (studentSnapshot.exists()) {
            const student = studentSnapshot.data();
            setStudentData(student);

            const domaineId = student.domaineId;

            const subdomainsRef = collection(db, "sous-domaines");
            const subdomainsQuery = query(subdomainsRef, where("domaineId", "==", domaineId));
            const subdomainsSnapshot = await getDocs(subdomainsQuery);

            const subdomainsList = subdomainsSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
            }));
            setSubDomains(subdomainsList);

            const subdomainIds = subdomainsList.map((subdomain) => subdomain.id);

            if (subdomainIds.length > 0) {
              const coursesRef = collection(db, "cours");
              const coursesQuery = query(coursesRef, where("sousDomaineId", "in", subdomainIds));
              const coursesSnapshot = await getDocs(coursesQuery);

              const coursesList = coursesSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              setCourses(coursesList);
            }
          } else {
            console.log("Aucun étudiant trouvé pour l'ID:", studentId);
            toast.error("Aucun étudiant trouvé");
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des données :", error);
          toast.error("Erreur lors de la récupération des données");
        } finally {
          setLoading(false);
        }
      };

      fetchStudentData();
    } else {
      console.log("Aucun utilisateur connecté");
      setLoading(false);
    }
  }, []);

  // Fonction pour démarrer une tâche
  const handleStartTask = async (courseId) => {
    try {
      const courseRef = doc(db, "cours", courseId);
      await updateDoc(courseRef, {
        status: "started",
        startDate: new Date().toISOString(),
      });
      showToast("Tâche démarrée !");
      fetchCourses();
    } catch (error) {
      console.error("Erreur lors du démarrage de la tâche :", error);
      showToast("Erreur lors du démarrage de la tâche", "error");
    }
  };

  // Fonction pour terminer une tâche
  const handleFinishTask = async (courseId) => {
    try {
      const courseRef = doc(db, "cours", courseId);
      await updateDoc(courseRef, {
        status: "finished",
        endDate: new Date().toISOString(),
      });
      showToast("Tâche terminée !");
      fetchCourses();
    } catch (error) {
      console.error("Erreur lors de la terminaison de la tâche :", error);
      showToast("Erreur lors de la terminaison de la tâche", "error");
    }
  };

  // Fonction pour récupérer la liste des cours
  const fetchCourses = async () => {
    try {
      const coursesRef = collection(db, "cours");
      const coursesSnapshot = await getDocs(coursesRef);

      const coursesList = coursesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCourses(coursesList);
    } catch (error) {
      console.error("Erreur lors de la récupération des cours :", error);
      showToast("Erreur lors de la récupération des cours", "error");
    }
  };

  const renderButtons = (course) => {
    if (course.status === "started") {
      return (
        <button
          className="bg-red-500 text-white text-sm px-4 py-2 rounded-md hover:bg-red-600"
          onClick={() => handleFinishTask(course.id)}
        >
          Terminer
        </button>
      );
    }

    if (course.status === "finished") {
      return <p className="text-gray-500">Tâche déjà terminée</p>;
    }

    return (
      <button
        className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-600 flex items-center space-x-2"
        onClick={() => handleStartTask(course.id)}
      >
        <PlayIcon className="h-5 w-5" />
        <span>Démarrer</span>
      </button>
    );
  };

  if (loading) {
    return <Loader />; // Afficher le loader pendant le chargement des données
  }

  if (!studentData) {
    return <div>Aucun étudiant trouvé</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Liste de vos tâches :</h2>
      {courses.length > 0 ? (
        <div className="space-y-4">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className="bg-white border border-gray-200 rounded-lg shadow-md p-4"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold">Tâche {index + 1} : {course.name}</h3>
              </div>
              <p className="text-gray-600 mb-3">{course.description}</p>
              {course.link && (
                <p className="text-blue-500 underline mb-3">
                  <a
                    href={course.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-700"
                  >
                    Voir le cours 
                  </a>
                </p>
              )}
              <div className="flex items-center space-x-4">
                {renderButtons(course)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Aucune tâche trouvée pour vos sous-domaines.</p>
      )}
    </div>
  );
};

export default TachesEtudiant;
