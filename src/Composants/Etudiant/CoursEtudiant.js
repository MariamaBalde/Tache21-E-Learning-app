// import { useState, useEffect } from 'react';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';
// import { db } from '../../Config/firebaseConfig';
// function Cours() {
//     const [courses, setCourses] = useState([]);
//     const [duration, setDuration] = useState(0);
//     const [timeLeft, setTimeLeft] = useState(duration);

//     // Récupérer les cours associés à un sous-domaine
//     useEffect(() => {
//         const fetchCourses = async () => {
//             const coursesRef = collection(db, 'courses');
//             const coursesSnapshot = await getDocs(coursesRef);
//             const coursesList = coursesSnapshot.docs.map(doc => doc.data());
//             setCourses(coursesList);
//         };
//         fetchCourses();
//     }, []);

//     // Logique du compte à rebours
//     useEffect(() => {
//         let timer;
//         if (timeLeft > 0) {
//             timer = setInterval(() => {
//                 setTimeLeft(prevTime => prevTime - 1);
//             }, 1000);
//         }
//         return () => clearInterval(timer); // Clean up when timeLeft reaches 0 or component unmounts
//     }, [timeLeft]);

//     const startCourse = (courseDuration) => {
//         setDuration(courseDuration);
//         setTimeLeft(courseDuration);
//     };

//     return (
//         <div>
//             <h2>Cours Disponibles</h2>
//             <div>
//                 {courses.map((course) => (
//                     <div key={course.name}>
//                         <h3>{course.name}</h3>
//                         <p>{course.description}</p>
//                         <p>Durée: {course.duration} minutes</p>
//                         <button onClick={() => startCourse(course.duration)}>Démarrer</button>
//                     </div>
//                 ))}
//             </div>

//             {timeLeft > 0 && (
//                 <div>
//                     <p>Temps restant: {timeLeft} secondes</p>
//                 </div>
//             )}
//             {timeLeft === 0 && <p>Cours terminé !</p>}
//         </div>
//     );
// }
// export default Cours;

import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../Config/firebaseConfig"; // Assurez-vous que le chemin est correct

const Dashboard = () => {
    const [studentData, setStudentData] = useState(null);
    const [subDomains, setSubDomains] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const studentId = user.uid;
            console.log("ID de l'étudiant:", studentId);

            // Récupérer les données de l'étudiant
            const fetchStudentData = async () => {
                try {
                    const studentRef = doc(db, "users", studentId);
                    const studentSnapshot = await getDoc(studentRef);

                    if (studentSnapshot.exists()) {
                        const student = studentSnapshot.data();
                        setStudentData(student);

                        // Récupérer le domaineId de l'étudiant
                        const domaineId = student.domaineId;
                        console.log("Domaine ID de l'étudiant:", domaineId);

                        // Maintenant, on va chercher les sous-domaines associés à ce domaineId
                        const subdomainsRef = collection(db, "sous-domaines");
                        const q = query(subdomainsRef, where("domaineId", "==", domaineId));
                        const querySnapshot = await getDocs(q);

                        const subdomainsList = querySnapshot.docs.map((doc) => doc.data());
                        setSubDomains(subdomainsList);

                    } else {
                        console.log("Aucun étudiant trouvé pour l'ID:", studentId);
                    }
                } catch (error) {
                    console.error("Erreur lors de la récupération des données de l'étudiant:", error);
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
        <div>
            <h1>Bienvenue, {studentData.name}</h1>
            <h2 className="text-2xl text-center mb-3 font-bold text-blue-800">Cours</h2>
            {subDomains.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subDomains.map((subdomain, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                            {/* Image du sous-domaine */}
                            {subdomain.imageURL && (
                                <img
                                    src={subdomain.imageURL}
                                    alt={subdomain.name}
                                    className="w-full h-48 object-cover rounded-md mb-4"
                                />
                            )}

                            <h3 className="text-xl font-semibold mb-4">{subdomain.name}</h3>
                            <p className="text-gray-600">{subdomain.description || "Aucune description disponible"}</p>

                            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">
                                Démarrer
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Aucun sous-domaine trouvé pour votre domaine.</p>
            )}
        </div>
    );
};
export default Dashboard;