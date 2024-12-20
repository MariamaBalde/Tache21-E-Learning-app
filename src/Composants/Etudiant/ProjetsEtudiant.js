import React, { useEffect, useState } from "react";
import { db } from "../../Config/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

function ProjetsEtudiant() {
    const [projets, setProjets] = useState([]);
    const [loading, setLoading] = useState(true);

    // Récupérer les projets actifs depuis Firebase
    const fetchProjets = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "projet"), where("archived", "==", false));
            const querySnapshot = await getDocs(q);
            const fetchedProjets = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProjets(fetchedProjets);
        } catch (error) {
            console.error("Erreur lors de la récupération des projets :", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjets();
    }, []);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 bg-gray-50">
            <h1 className="text-2xl font-bold text-start mb-6 text-blue-600">
                Projets de validations
            </h1>

            {loading ? (
                <p>Chargement des projets...</p>
            ) : projets.length === 0 ? (
                <p>Aucun projet disponible pour le moment.</p>
            ) : (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projets.map((projet) => (
                        <li
                            key={projet.id}
                            className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
                        >
                            <h1 className="font-bold text-lg text-blue-500">{projet.title}</h1>
                            <div
                                className="mt-2 text-gray-700 break-words"
                                dangerouslySetInnerHTML={{ __html: projet.content }}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ProjetsEtudiant;
