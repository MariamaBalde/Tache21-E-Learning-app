import React, { useState } from "react";
import { db } from "../../Config/firebaseConfig"; // Import Firestore
import { collection, addDoc } from "firebase/firestore";

const LivraisonsEtudiant = () => {
  const [livraison, setLivraison] = useState({
    projet: "",
    description: "",
    images: [],
  });

  const [confirmation, setConfirmation] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLivraison((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setLivraison((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const handleSubmit = async () => {
    if (!livraison.projet || !livraison.description || livraison.images.length === 0) {
      alert("Veuillez remplir tous les champs et ajouter au moins une image.");
      return;
    }

    try {
      // Ajouter la livraison dans Firestore
      await addDoc(collection(db, "livraisons"), {
        ...livraison,
        statut: "En attente", // Initialiser avec le statut "En attente"
        date: new Date().toISOString(), // Ajouter une date
      });
      setConfirmation(true);
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Soumission de votre travail</h1>
      {!confirmation ? (
        <div>
          <div className="mb-4">
            <label htmlFor="projet" className="block text-gray-700 font-medium">
              Sélectionnez une tâche :
            </label>
            <select
              id="projet"
              name="projet"
              className="mt-2 p-2 w-full border rounded-md"
              value={livraison.projet}
              onChange={handleInputChange}
            >
              <option value="">-- Choisir une tâche --</option>
              <option value="Tâche 1">Tâche 1</option>
              <option value="Tâche 2">Tâche 2</option>
              <option value="Tâche 3">Tâche 3</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-medium">
              Description :
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              className="mt-2 p-2 w-full border rounded-md"
              placeholder="Décrivez votre travail ici..."
              value={livraison.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="images" className="block text-gray-700 font-medium">
              Ajoutez des images :
            </label>
            <input
              type="file"
              id="images"
              multiple
              accept="image/*"
              className="mt-2 p-2 w-full border rounded-md"
              onChange={handleImageUpload}
            />
          </div>

          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Soumettre mon travail
          </button>
        </div>
      ) : (
        <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
          <p className="font-semibold">Votre travail a été soumis avec succès !</p>
          <p>Vous serez notifié lorsque votre coach l'aura validé ou rejeté.</p>
        </div>
      )}
    </div>
  );
};

export default LivraisonsEtudiant;