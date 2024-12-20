import React, { useState, useEffect } from "react";
import { auth, db } from "../../Config/firebaseConfig"; // Import des instances Firebase
import { doc, getDoc, updateDoc } from "firebase/firestore";

function Profil() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "Utilisateur",
    email: "",
    phone: "",
    image: "https://via.placeholder.com/40", // URL par défaut
  });

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    photo: "", // L'URL de l'image
  });

  // Charger les données utilisateur depuis Firebase
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserData({
              name: `${data.nom} ${data.prenom}`,
              email: data.email,
              phone: data.telephone || "",
              image: data.photo || "https://via.placeholder.com/40",
            });
            setFormData({
              nom: data.nom || "",
              prenom: data.prenom || "",
              telephone: data.telephone || "",
              photo: data.photo || "", // Charger l'URL de l'image
            });
          }
        } catch (error) {
          console.error("Erreur lors du chargement des données utilisateur :", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    window.location.href = "/login";
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (user) {
      try {
        // Mettre à jour les données dans Firestore
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          nom: formData.nom,
          prenom: formData.prenom,
          telephone: formData.telephone,
          photo: formData.photo || userData.image, // Enregistrer l'URL de l'image
        });

        // Mettre à jour localement
        setUserData({
          name: `${formData.nom} ${formData.prenom}`,
          email: userData.email,
          phone: formData.telephone,
          image: formData.photo || userData.image, // Utiliser l'URL de l'image
        });

        // Fermer la modal
        toggleModal();
      } catch (error) {
        console.error("Erreur lors de la mise à jour des données utilisateur :", error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="relative">
      {/* Bouton principal */}
      <div
        onClick={toggleDropdown}
        className="flex items-center cursor-pointer space-x-2"
      >
        <img
          src={userData.image}
          alt="Profil utilisateur"
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="font-medium text-white">
          {userData.name || "Utilisateur"}
        </span>
        <span className="text-white">▼</span>
      </div>

      {/* Menu déroulant */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg w-48 z-10">
          <ul className="py-2">
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={toggleModal}
            >
              Profil
            </li>
            <li
              className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer"
              onClick={handleLogout}
            >
              Déconnexion
            </li>
          </ul>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-lg font-bold mb-4">Modifier le Profil</h2>
            <form onSubmit={handleSubmit}>
              {/* Image de profil */}
              <div className="flex justify-center text-white mb-6">
                <img
                  src={formData.photo || userData.image}
                  alt="Photo actuelle"
                  className="w-20 h-20 rounded-full object-cover border border-gray-300"
                />
              </div>

              {/* Champ Nom */}
              <div className="flex items-center mb-4">
                <label className="w-1/3 text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className="w-2/3 border border-gray-300 rounded-md p-2"
                />
              </div>

              {/* Champ Prénom */}
              <div className="flex items-center mb-4">
                <label className="w-1/3 text-sm font-medium text-gray-700">Prénom</label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  className="w-2/3 border border-gray-300 rounded-md p-2"
                />
              </div>

              {/* Champ Téléphone */}
              <div className="flex items-center mb-4">
                <label className="w-1/3 text-sm font-medium text-gray-700">Téléphone</label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="w-2/3 border border-gray-300 rounded-md p-2"
                />
              </div>

              {/* Champ URL de la photo */}
              <div className="flex items-center mb-4">
                <label className="w-1/3 text-sm font-medium text-gray-700">URL de la photo</label>
                <input
                  type="text"
                  name="photo"
                  value={formData.photo}
                  onChange={handleChange}
                  className="w-2/3 border border-gray-300 rounded-md p-2"
                  placeholder="Entrez l'URL de l'image sur GitHub"
                />
              </div>

              {/* Boutons */}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="px-4 py-2 bg-gray-200 rounded-md text-gray-700"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profil;
