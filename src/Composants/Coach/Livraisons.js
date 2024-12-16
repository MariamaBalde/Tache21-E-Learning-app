import React, { useEffect, useState } from "react";
import { db } from "../../Config/firebaseConfig";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";

const Livraisons = () => {
  const [livraisons, setLivraisons] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "livraisons"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLivraisons(data);
    });

    return () => unsubscribe();
  }, []);

  const handleAction = async (id, action) => {
    try {
      await updateDoc(doc(db, "livraisons", id), { statut: action });
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Livraisons à évaluer</h1>
      <div className="space-y-4">
        {livraisons.map((livraison) => (
          <div key={livraison.id} className="p-4 border rounded-lg bg-gray-50">
            <p className="text-lg font-semibold text-gray-700">
              Étudiant : {livraison.etudiant || "Inconnu"}
            </p>
            <p className="text-lg text-gray-600">Tâche : {livraison.projet}</p>
            <p className="mt-2 text-gray-600">{livraison.description}</p>
            <div className="mt-4">
              {livraison.statut === "En attente" ? (
                <>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => handleAction(livraison.id, "Validé")}
                  >
                    Valider
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleAction(livraison.id, "Rejeté")}
                  >
                    Rejeter
                  </button>
                </>
              ) : (
                <p className={`mt-2 font-semibold ${livraison.statut === "Validé" ? "text-green-700" : "text-red-700"}`}>
                  {livraison.statut}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Livraisons;
