import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../Config/firebaseConfig"; // Assurez-vous que le chemin est correct
import Loader from "../Shared/Loader"; // Import du composant Loader
import { Bar } from 'react-chartjs-2'; // Import de Chart.js
import { FileText, CheckSquare, BookOpen } from 'lucide-react'; // Ajout de l'icône BookOpen
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Enregistrement des composants de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [studentData, setStudentData] = useState(null);
    const [subDomains, setSubDomains] = useState([]);
    const [courses, setCourses] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
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

                        // Récupérer les projets de l'étudiant
                        const projectsRef = collection(db, "projet");
                        const projectsQuery = query(projectsRef, where("archived", "==", false));
                        const projectsSnapshot = await getDocs(projectsQuery);

                        const projectsList = projectsSnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }));
                        setProjects(projectsList);
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
        return <Loader />; // Afficher le loader pendant le chargement des données
    }

    if (!studentData) {
        return <div>Aucun étudiant trouvé</div>;
    }

    // Données pour le diagramme avec les mêmes couleurs que les cartes
    const chartData = {
        labels: ['Sous-domaines', 'Tâches', 'Projets'],
        datasets: [
            {
                label: 'Quantité',
                data: [subDomains.length, courses.length, projects.length],
                backgroundColor: [
                    '#3B82F6', // Couleur pour les sous-domaines
                    '#FF66FF', // Couleur pour les tâches
                    '#1D4ED8', // Couleur pour les projets
                ],
                borderColor: [
                    '#1E40AF', // Bordure pour les sous-domaines
                    '#DB2777', // Bordure pour les tâches
                    '#1E3A8A', // Bordure pour les projets
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="px-6 bg-gray-50">
            <h2 className="text-xl text-blue-600 font-bold mb-6">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Carte pour le nombre de sous-domaines */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-300 p-10 rounded-lg shadow-md flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-semibold text-white">Sous-domaines</h3>
                        <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-4xl font-bold text-white text-left">{subDomains.length}</h4>
                </div>

                {/* Carte pour le nombre de cours */}
                <div className="bg-gradient-to-br from-blue-300 to-[#FF66FF] p-10 rounded-lg shadow-md flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-semibold text-white">Tâches</h3>
                        <FileText className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-4xl font-bold text-white text-left">{courses.length}</h4>
                </div>

                {/* Carte pour le nombre de projets */}
                <div className="bg-gradient-to-br from-blue-200 to-blue-800 p-10 rounded-lg shadow-md flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-semibold text-white">Projets</h3>
                        <CheckSquare className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-4xl font-bold text-white text-left">{projects.length}</h4>
                </div>
            </div>

            {/* Diagramme des données */}
            <div className="mt-8">
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">Diagramme des Données</h3>
                <Bar data={chartData} options={{ responsive: true }} />
            </div>
        </div>
    );
};

export default Dashboard;




// import { useState, useEffect } from "react";
// import { getAuth } from "firebase/auth";
// import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
// import { db } from "../../Config/firebaseConfig"; // Assurez-vous que le chemin est correct
// import Loader from "../Shared/Loader"; // Import du composant Loader
// import { FileText, CheckSquare, BookOpen } from 'lucide-react'; // Ajout de l'icône BookOpen

// const Dashboard = () => {
//     const [studentData, setStudentData] = useState(null);
//     const [subDomains, setSubDomains] = useState([]);
//     const [courses, setCourses] = useState([]);
//     const [projects, setProjects] = useState([]); // État pour les projets
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const auth = getAuth();
//         const user = auth.currentUser;

//         if (user) {
//             const studentId = user.uid;

//             const fetchStudentData = async () => {
//                 try {
//                     const studentRef = doc(db, "users", studentId);
//                     const studentSnapshot = await getDoc(studentRef);

//                     if (studentSnapshot.exists()) {
//                         const student = studentSnapshot.data();
//                         setStudentData(student);

//                         const domaineId = student.domaineId;

//                         const subdomainsRef = collection(db, "sous-domaines");
//                         const subdomainsQuery = query(subdomainsRef, where("domaineId", "==", domaineId));
//                         const subdomainsSnapshot = await getDocs(subdomainsQuery);

//                         const subdomainsList = subdomainsSnapshot.docs.map((doc) => ({
//                             id: doc.id,
//                             ...doc.data()
//                         }));
//                         setSubDomains(subdomainsList);

//                         const subdomainIds = subdomainsList.map((subdomain) => subdomain.id);

//                         if (subdomainIds.length > 0) {
//                             const coursesRef = collection(db, "cours");
//                             const coursesQuery = query(coursesRef, where("sousDomaineId", "in", subdomainIds));
//                             const coursesSnapshot = await getDocs(coursesQuery);

//                             const coursesList = coursesSnapshot.docs.map((doc) => ({
//                                 id: doc.id,
//                                 ...doc.data(),
//                             }));
//                             setCourses(coursesList);
//                         }

//                         // Récupérer les projets de l'étudiant
//                         const projectsRef = collection(db, "projets");
//                         const projectsQuery = query(projectsRef, where("studentId", "==", studentId)); // Assurez-vous que 'studentId' est correct
//                         const projectsSnapshot = await getDocs(projectsQuery);

//                         const projectsList = projectsSnapshot.docs.map((doc) => ({
//                             id: doc.id,
//                             ...doc.data(),
//                         }));
//                         setProjects(projectsList);
//                     } else {
//                         console.log("Aucun étudiant trouvé pour l'ID:", studentId);
//                     }
//                 } catch (error) {
//                     console.error("Erreur lors de la récupération des données :", error);
//                 } finally {
//                     setLoading(false);
//                 }
//             };

//             fetchStudentData();
//         } else {
//             console.log("Aucun utilisateur connecté");
//             setLoading(false);
//         }
//     }, []);

//     if (loading) {
//         return <Loader />; // Afficher le loader pendant le chargement des données
//     }

//     if (!studentData) {
//         return <div>Aucun étudiant trouvé</div>;
//     }

//     return (
//         <div className="px-6 bg-gray-50">
//             <h2 className="text-xl text-blue-600 font-bold mb-6">Dashboard</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {/* Carte pour le nombre de sous-domaines */}
//                 <div className="bg-gradient-to-br from-blue-600 to-blue-300 p-10 rounded-lg shadow-md flex flex-col">
//                     <div className="flex justify-between items-center mb-4">
//                         <h3 className="text-2xl font-semibold text-white">Sous-domaines</h3>
//                         <BookOpen className="w-8 h-8 text-white" />
//                     </div>
//                     <h4 className="text-4xl font-bold text-white text-left">{subDomains.length}</h4>
//                 </div>

//                 {/* Carte pour le nombre de cours */}
//                 <div className="bg-gradient-to-br from-blue-300 to-[#FF66FF] p-10 rounded-lg shadow-md flex flex-col">
//                     <div className="flex justify-between items-center mb-4">
//                         <h3 className="text-2xl font-semibold text-white">Tâches</h3>
//                         <FileText className="w-8 h-8 text-white" />
//                     </div>
//                     <h4 className="text-4xl font-bold text-white text-left">{courses.length}</h4>
//                 </div>

//                 {/* Carte pour le nombre de projets */}
//                 <div className="bg-gradient-to-br from-blue-200 to-blue-800 p-10 rounded-lg shadow-md flex flex-col">
//                     <div className="flex justify-between items-center mb-4">
//                         <h3 className="text-2xl font-semibold text-white">Projets</h3>
//                         <CheckSquare className="w-8 h-8 text-white" />
//                     </div>
//                     <h4 className="text-4xl font-bold text-white text-left">{projects.length}</h4>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;

  