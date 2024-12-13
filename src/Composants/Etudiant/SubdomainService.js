import { db } from "../../Config/firebaseConfig";

// Fonction pour récupérer les sous-domaines liés à un domainId
export async function getSubdomainsByDomainId(domainId) {
    try {
        const subdomainsRef = db.collection("sous-domaines");
        const querySnapshot = await subdomainsRef.where("domainId", "==", domainId).get();

        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error("Erreur lors de la récupération des sous-domaines :", error);
        throw error;
    }
}

