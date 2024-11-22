import React, { useState, useEffect } from "react";

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "Jean",
    lastName: "Dupont",
    password: "",
    profilePicture: "https://via.placeholder.com/40", // URL par défaut
  });

  // Charger les données depuis Local Storage lorsque le composant est monté
  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile)); // Charger les données sauvegardées
    }
  }, []);

  // Fonction pour sauvegarder les données dans Local Storage
  const saveProfileToLocalStorage = (updatedProfile) => {
    localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedProfile = {
      ...profile,
      [name]: value,
    };
    setProfile(updatedProfile);
  };

  const handleSave = () => {
    console.log("Profil mis à jour :", profile);
    saveProfileToLocalStorage(profile); // Sauvegarder dans Local Storage
    setIsModalOpen(false);
    alert("Profil mis à jour avec succès !");
  };

  return (
    <div>
      {/* Navbar */}
      <div className="bg-white shadow-md flex items-center justify-between px-6 py-3 relative">
        <div className="text-xl font-bold text-gray-800">E-Learning</div>

        {/* User Info and Menu */}
        <div className="relative flex items-center space-x-3">
          <img
            src={profile.profilePicture}
            alt="Profil"
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
          />
          <span className="text-gray-800 font-medium">
            {profile.firstName} {profile.lastName}
          </span>
          <button
            className="text-gray-800 flex items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ▼
          </button>
          {isMenuOpen && (
            <div className="absolute z-10 bg-white rounded-lg shadow w-32 top-full right-0">
              <ul className="py-2 text-sm text-gray-950">
                <li>
                  <button
                    className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                    onClick={() => {
                      setIsModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    Profil
                  </button>
                </li>
                <li>
                  <button className="block px-4 py-2 w-full text-left hover:bg-gray-100">
                    Settings
                  </button>
                </li>
                <li>
                  <button className="block px-4 py-2 w-full text-left hover:bg-gray-100">
                    Déconnecter
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-end items-start p-12">
          <div className="bg-blue-100 rounded-lg shadow-lg w-80 p-6 border border-blue-400">
            <h2 className="text-lg font-bold text-gray-800 mb-3">
              Modifier le Profil
            </h2>
            <form className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Prénom
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  value={profile.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Changer de profil
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        const updatedProfile = {
                          ...profile,
                          profilePicture: reader.result,
                        };
                        setProfile(updatedProfile);
                        saveProfileToLocalStorage(updatedProfile); // Sauvegarder la nouvelle image
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </form>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;



