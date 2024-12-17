import { useState, useEffect } from "react";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../Config/firebaseConfig"; // Assurez-vous que le chemin est correct
const TachesEtudiant = () => {
  const [studentData, setStudentData] = useState(null);
  const [subDomains, setSubDomains] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [taskStatus, setTaskStatus] = useState({}); // État pour gérer les statuts des tâches
  const [currentTask, setCurrentTask] = useState(null); // État pour afficher la tâche démarrée dans livraison

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      const studentId = user.uid;

      const fetchStudentData = async () => {
        try {
          // Récupérer les données de l'étudiant
          const studentRef = doc(db, "users", studentId);
          const studentSnapshot = await getDoc(studentRef);

          if (studentSnapshot.exists()) {
            const student = studentSnapshot.data();
            setStudentData(student);

            const domaineId = student.domaineId;

            // Récupérer les sous-domaines associés
            const subdomainsRef = collection(db, "sous-domaines");
            const subdomainsQuery = query(subdomainsRef, where("domaineId", "==", domaineId));
            const subdomainsSnapshot = await getDocs(subdomainsQuery);

            const subdomainsList = subdomainsSnapshot.docs.map((doc) => ({
              id: doc.id, // Récupère l'ID du sous-domaine
              ...doc.data(),
            }));
            setSubDomains(subdomainsList);

            // Récupérer les cours associés aux sous-domaines
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

              // Initialiser les statuts des tâches (aucune démarrée ou terminée par défaut)
              const initialStatus = {};
              coursesList.forEach((course) => {
                initialStatus[course.id] = { started: false, completed: false };
              });
              setTaskStatus(initialStatus);
            }
          } else {
            console.log("Aucun étudiant trouvé pour l'ID:", studentId);
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des données :", error);
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

  const handleStartTask = (courseId, courseName) => {
    setTaskStatus((prevStatus) => ({
      ...prevStatus,
      [courseId]: { ...prevStatus[courseId], started: true },
    }));
    setCurrentTask(courseName); // Affiche le nom de la tâche dans livraison
  };

  const handleCompleteTask = (courseId) => {
    setTaskStatus((prevStatus) => ({
      ...prevStatus,
      [courseId]: { ...prevStatus[courseId], completed: true },
    }));
    setCurrentTask(null); // Réinitialise l'affichage de livraison
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!studentData) {
    return <div>Aucun étudiant trouvé</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Liste de vos tâches :</h2>
      {courses.length > 0 ? (
        <div className="space-y-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white border border-gray-200 rounded-lg shadow-md p-4"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold">
                  Tâche : {course.name}
                </h3>
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
                <button
                  className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-600"
                  onClick={() => handleStartTask(course.id, course.name)}
                  disabled={taskStatus[course.id]?.started} // Désactive le bouton si déjà démarré
                >
                  Démarrer
                </button>
                <button
                  className="bg-red-500 text-white text-sm px-4 py-2 rounded-md hover:bg-red-600"
                  onClick={() => handleCompleteTask(course.id)}
                  disabled={!taskStatus[course.id]?.started || taskStatus[course.id]?.completed} // Activé seulement après Démarrer
                >
                  Terminer
                </button>
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







