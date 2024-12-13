import { useState, useEffect } from "react";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { auth,db } from "../../Config/firebaseConfig"; // Assurez-vous que le chemin est correct

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
              ...doc.data()
            }));
            setSubDomains(subdomainsList);

            // Récupérer les cours associés aux sous-domaines
            const subdomainIds = subdomainsList.map((subdomain) => subdomain.id);
            if (subdomainIds.length > 0) {
              const coursesRef = collection(db, "cours");
              const coursesQuery = query(coursesRef, where("sousDomaineId", "in", subdomainIds));
              const coursesSnapshot = await getDocs(coursesQuery);

              const coursesList = coursesSnapshot.docs.map((doc) => doc.data());
              setCourses(coursesList);
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

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!studentData) {
    return <div>Aucun étudiant trouvé</div>;
  }

  return (
    // <div>
    //   <h1>Bienvenue, {studentData.name}</h1>
    //   <h2>Les cours associés à vos sous-domaines :</h2>
    //   {courses.length > 0 ? (
    //     <ul>
    //       {courses.map((course, index) => (
    //         <li key={index}>
    //           <strong>{course.name}</strong>
    //           <p>{course.description}</p>
    //           <p>Durée : {course.duration} jours</p>
    //           {course.link && (
    //             <p>
    //               <a
    //                 href={course.link}
    //                 target="_blank"
    //                 rel="noopener noreferrer"
    //                 className="text-blue-500 underline"
    //               >
    //                 Accéder au cours
    //               </a>
    //             </p>
    //           )}
    //         </li>
    //       ))}
    //     </ul>
    //   ) : (
    //     <p>Aucun cours trouvé pour vos sous-domaines.</p>
    //   )}
    // </div>
    <div className="px-6 py-0">
      <h1 className="text-2xl font-bold">Bienvenue, {studentData.name}</h1>
      {/* <h2 className="text-xl font-semibold mb-4">Les cours associés à vos sous-domaines :</h2> */}
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-4 border hover:shadow-xl transition duration-300"
            >
              <h3 className="text-lg font-bold mb-2">{course.name}</h3>
              <p className="text-gray-600 mb-2">{course.description}</p>
              <p className="text-sm text-gray-500 mb-4">Durée : {course.duration} jours</p>
              {course.link && (
                <a
                  href={course.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 font-semibold underline hover:text-blue-700"
                >
                  Accéder au cours
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Aucun cours trouvé pour vos sous-domaines.</p>
      )}
    </div>
  );
};

export default TachesEtudiant;

