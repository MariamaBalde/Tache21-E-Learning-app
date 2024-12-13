import React, { useState, useEffect } from "react";
import { FiBell, FiMail, FiX, FiSend } from "react-icons/fi";
import Profil from '../Coach/Profil';
import { storage, db } from "../../Config/firebaseConfig"; // Remplace par ton fichier de config Firebase


const Navbar = () => {
  const [userData, setUserData] = useState({}); // Stocke les données utilisateur
  const [showModal, setShowModal] = useState(false); // État pour afficher le modal
  const [showMessagerie, setShowMessagerie] = useState(false); // État pour afficher la messagerie
  const [selectedTask, setSelectedTask] = useState(""); // Tâche sélectionnée
  const [description, setDescription] = useState(""); // Description de la tâche
  const [file, setFile] = useState(null); // Fichier joint

  // Récupérer les données utilisateur depuis localStorage
  useEffect(() => {
    const storedUserData = localStorage.getItem("profileData");
    if (storedUserData) {
      try {
        const parsedData = JSON.parse(storedUserData);
        setUserData(parsedData); // Mettre à jour l'état avec les données utilisateur
      } catch (error) {
        console.error('Erreur lors de la lecture des données utilisateur :', error);
      }
    }
  }, []); // Le tableau vide [] garantit que le hook est appelé une seule fois au montage

  // Gestion de l'affichage du modal
  const toggleModal = () => setShowModal(!showModal);

  // Gestion de l'affichage de la messagerie
  const toggleMessagerie = () => setShowMessagerie(!showMessagerie);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTask || !description) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    try {
      console.log("Début de l'envoi...");
      console.log("userData.uid :", userData.uid);
      console.log("selectedTask :", selectedTask);
      console.log("description :", description);
      console.log("file :", file);

      // Étape 1 : Upload du fichier dans Firebase Storage
      let fileUrl = "";
      if (file) {
        const storageRef = storage.ref(`deliveries/${userData.uid}/${file.name}`);
        console.log("Uploading file to:", storageRef.fullPath);
        await storageRef.put(file);
        fileUrl = await storageRef.getDownloadURL();
        console.log("File uploaded, URL:", fileUrl);
      }

      // Étape 2 : Enregistrement dans Firestore
      const deliveryRef = db.collection("deliveries").doc();
      console.log("Adding document to Firestore...");
      await deliveryRef.set({
        userId: userData.uid,
        task: selectedTask,
        description,
        fileUrl,
        date: new Date().toISOString(),
        status: "pending", // Statut initial
      });
      console.log("Document ajouté dans Firestore :", deliveryRef.id);

      // Réinitialiser les champs et fermer le modal
      setSelectedTask("");
      setDescription("");
      setFile(null);
      toggleModal();
      alert("Travail envoyé avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error.message, error.stack);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };





  return (
    <header className="flex justify-between items-center p-4 bg-[#191970] shadow-md">
      {/* Bouton "Envoyer mon travail" */}
      <button
        onClick={toggleModal}
        className="flex items-center space-x-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        <FiSend className="text-lg" />
        <span>Envoyer mon travail</span>
      </button>

      {/* Icônes de messagerie, notification et profil utilisateur */}
      <div className="flex items-center space-x-4">
        <FiMail
          className="text-white text-3xl cursor-pointer"
          onClick={toggleMessagerie}
        />
        <FiBell className="text-white text-3xl" />
        
        {/* Affichage du profil utilisateur */}
        <Profil className="text-gray-500" />
      </div>

      {/* Modal pour soumettre une tâche */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-gray-500"
            >
              <FiX className="text-xl" />
            </button>
            <h2 className="text-xl font-bold mb-6">Envoyer mon travail</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Choisir une tâche</label>
                <select
                  value={selectedTask}
                  onChange={(e) => setSelectedTask(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">-- Sélectionnez une tâche --</option>
                  <option value="Tâche 1">Tâche 1</option>
                  <option value="Tâche 2">Tâche 2</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Description des livrables
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows="4"
                  placeholder="Décrivez les livrables..."
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Ajouter des images</label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-green-600"
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

