import React, { useState, useEffect } from "react";

function Profil() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "Utilisateur",
    firstName: "",
    email: "",
    phone: "",
    image: "https://via.placeholder.com/40",
  });

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    photo: null,
  });

  // Charger les données utilisateur depuis le localStorage
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData({
      name: `${formData.nom} ${formData.prenom}`,
      phone: formData.telephone,
      image: formData.photo || userData.image,
    });
    localStorage.setItem(
      "userData",
      JSON.stringify({
        name: `${formData.nom} ${formData.prenom}`,
        email: userData.email,
        phone: formData.telephone,
        image: formData.photo || userData.image,
      })
    );
    toggleModal(); // Close the modal after save
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, photo: imageUrl });
    }
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
        <span className="font-medium text-gray-800">
          {userData.name || "Utilisateur"}
        </span>
        <span className="text-gray-500">▼</span>
      </div>

      {/* Menu déroulant */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg w-48 z-10">
          <ul className="py-2">
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={toggleModal} // Ouvrir le modal
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
              <div className="flex justify-center mb-6">
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
                  value={formData.nom || userData.name.split(" ")[0]} // Pré-remplir le nom
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
                  value={formData.prenom || userData.name.split(" ")[1]} // Pré-remplir le prénom
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
                  value={formData.telephone || userData.phone}
                  onChange={handleChange}
                  className="w-2/3 border border-gray-300 rounded-md p-2"
                />
              </div>

              {/* Champ Photo */}
              <div className="flex items-center mb-4">
                <label className="w-1/3 text-sm font-medium text-gray-700">Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-2/3 border border-gray-300 rounded-md p-2"
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





