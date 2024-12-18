import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../Config/firebaseConfig"; // Assurez-vous que le chemin est correct

const CoursEtudiant = () => {
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
            <h2 className="text-xl  font-semibold text-blue-800">Liste de vos Cours</h2>
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

                        </div>
                    ))}
                </div>
            ) : (
                <p>Aucun sous-domaine trouvé pour votre domaine.</p>
            )}
        </div>
    );
};
export default CoursEtudiant;