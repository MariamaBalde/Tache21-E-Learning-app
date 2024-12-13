import React, { useState, useEffect } from "react";
import { db } from "../../Config/firebaseConfig";
import { getSubdomainsByDomainId } from "./SubdomainService";

const AssignSubdomains = ({ domainId, studentId }) => {
    const [subdomains, setSubdomains] = useState([]);
    const [selectedSubdomains, setSelectedSubdomains] = useState([]);

    // Récupérer les sous-domaines lorsque le domainId change
    useEffect(() => {
        if (domainId) {
            getSubdomainsByDomainId(domainId)
                .then(setSubdomains)
                .catch((error) => console.error(error));
        }
    }, [domainId]);

    const handleAssignSubdomains = async () => {
        try {
            const studentRef = db.collection("users").doc(studentId); // Note : Ajuste selon ta structure Firestore
            await studentRef.update({
                assignedSubdomains: selectedSubdomains,
            });
            alert("Sous-domaines assignés avec succès !");
        } catch (error) {
            console.error("Erreur lors de l'assignation :", error);
        }
    };

    return (
        <div className="p-4">
            <h3 className="text-lg font-bold mb-2">Assigner des sous-domaines</h3>
            <select
                multiple
                value={selectedSubdomains}
                onChange={(e) =>
                    setSelectedSubdomains(Array.from(e.target.selectedOptions, (opt) => opt.value))
                }
                className="block w-full border border-gray-300 rounded-md p-2"
            >
                {subdomains.map((subdomain) => (
                    <option key={subdomain.id} value={subdomain.id}>
                        {subdomain.name}
                    </option>
                ))}
            </select>
            <button
                onClick={handleAssignSubdomains}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                Assigner
            </button>
        </div>
    );
};

export default AssignSubdomains;

