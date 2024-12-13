import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Config/firebaseConfig'; // Importez votre configuration Firebase

const StudentInterface = ({ studentId }) => {
    const [subDomainData, setSubDomainData] = useState(null); // Renommé pour récupérer les sous-domaines
    const [loading, setLoading] = useState(true);

    const getSubDomainForStudent = async (studentId) => {
        try {
            // Vérifier si l'ID de l'étudiant est défini
            console.log("ID étudiant:", studentId);

            const studentDoc = await getDoc(doc(db, 'users', studentId));

            // Vérifier si les données de l'étudiant existent
            if (studentDoc.exists()) {
                const studentData = studentDoc.data();
                console.log("Données de l'étudiant:", studentData); // Ajoutez cette ligne pour déboguer

                // Vérifier si sousDomaineId est défini
                if (!studentData || !studentData.sousDomaineId) {
                    console.warn("Aucun sousDomaineId trouvé dans les données de l'étudiant.");
                    return null;
                }

                const sousDomaineId = studentData.sousDomaineId;
                console.log("Sous-domaine ID trouvé:", sousDomaineId); // Ajoutez cette ligne pour déboguer

                // Récupérer le sous-domaine lié
                const subDomainDoc = await getDoc(doc(db, 'sous-domaines', sousDomaineId));

                // Vérifier si le sous-domaine est trouvé
                if (subDomainDoc.exists()) {
                    console.log("Sous-domaine trouvé:", subDomainDoc.data()); // Ajoutez cette ligne pour déboguer
                    return subDomainDoc.data();
                } else {
                    console.warn("Sous-domaine introuvable pour cet ID :", sousDomaineId);
                    return null;
                }
            } else {
                console.warn("Étudiant introuvable !");
                return null;
            }
        } catch (error) {
            console.error("Erreur lors de la récupération du sous-domaine :", error);
            return null;
        }
    };

    useEffect(() => {
        const fetchSubDomain = async () => {
            setLoading(true);
            const subDomain = await getSubDomainForStudent(studentId); // studentId est l'ID de l'étudiant
            setSubDomainData(subDomain);
            setLoading(false);
        };

        fetchSubDomain();
    }, [studentId]);

    return (
        <div>
            {loading ? (
                <p>Chargement...</p>
            ) : subDomainData ? (
                <div>
                    <h2>Sous-domaine assigné</h2>
                    <p><strong>Nom :</strong> {subDomainData.domaineName || 'Nom inconnu'}</p>
                    <p><strong>Description :</strong> {subDomainData.description || 'Description non disponible'}</p>
                    <img src={subDomainData.imageURL} alt={subDomainData.domaineName} style={{ maxWidth: '100%' }} />
                </div>
            ) : (
                <p>Aucun sous-domaine assigné.</p>
            )}
        </div>
    );
};

export default StudentInterface;

