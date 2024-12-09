import React, { useState, useEffect } from 'react';

function ProfileEtudiant() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
  });
  const [profileImage, setProfileImage] = useState(
    'https://via.placeholder.com/100' // Image par défaut
  );
  const [isProfileEdited, setIsProfileEdited] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Charger les données utilisateur depuis localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('profileData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData.formData || {});
        setProfileImage(parsedData.profileImage || 'https://via.placeholder.com/100');
        setIsProfileEdited(true);
      } catch (error) {
        console.error('Erreur lors de la lecture de profileData :', error);
      }
    }
  }, []);

  // Sauvegarder les données dans localStorage
  const saveProfileData = () => {
    const profileData = {
      formData,
      profileImage,
    };
    localStorage.setItem('profileData', JSON.stringify(profileData));
  };

  // Basculer le modal d'édition
  const toggleModal = () => setModalOpen(!isModalOpen);

  // Gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Gérer le changement de l'image de profil
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageBase64 = reader.result;
        setProfileImage(imageBase64);
        saveProfileData(); // Sauvegarde immédiate
      };
      reader.readAsDataURL(file);
    } else {
      alert('Veuillez sélectionner une image valide.');
    }
  };

  // Gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProfileEdited(true);
    saveProfileData();
    toggleModal();
  };

  // Basculer le menu contextuel
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Fermer le menu contextuel en cas de clic à l'extérieur
  useEffect(() => {
    const handleClickOutside = () => setMenuOpen(false);
    if (menuOpen) {
      window.addEventListener('click', handleClickOutside);
    }
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="relative flex items-center">
      <div>
        <img
          src={profileImage}
          alt="Photo de profil"
          className="w-8 h-8 rounded-full object-cover border border-gray-300 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // Empêcher la fermeture immédiate
            toggleMenu();
          }}
        />
        {menuOpen && (
          <div className="absolute bg-white rounded-lg shadow w-32 top-full right-0 z-10">
            <ul className="py-2 text-sm text-gray-950">
              <li>
                <button
                  onClick={() => {
                    toggleMenu();
                    toggleModal();
                  }}
                  className="block px-4 py-2 w-full text-left"
                >
                  Profil
                </button>
              </li>
              <li>
                <button className="block px-4 py-2 w-full text-left">Settings</button>
              </li>
              <li>
                <a href="/login" className="block px-4 py-2">
                  Déconnecter
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>

      {isProfileEdited ? (
        <div className="ml-2 text-sm">
          <span>{formData.nom} {formData.prenom}</span>
        </div>
      ) : (
        <button
          onClick={toggleModal}
          className="ml-2 p-1 bg-blue-500 text-white rounded-full text-xs"
        >
          Modifier
        </button>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-lg font-bold mb-4">Modifier le Profil</h2>
            <form onSubmit={handleSubmit}>
              {/* Image de profil */}
              <div className="flex justify-center mb-6">
                <img
                  src={profileImage}
                  alt="Photo actuelle"
                  className="w-20 h-20 rounded-full object-cover border border-gray-300"
                />
              </div>

              {/* Champs de formulaire */}
              {['nom', 'prenom', 'telephone'].map((field) => (
                <div key={field} className="flex items-center mb-4">
                  <label className="w-1/3 text-sm font-medium text-gray-700 capitalize">
                    {field}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-2/3 border border-gray-300 rounded-md p-2"
                  />
                </div>
              ))}

              {/* Champ pour changer l'image */}
              <div className="flex items-center mb-4">
                <label className="w-1/3 text-sm font-medium text-gray-700">Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-2/3 border border-gray-300 rounded-md p-2"
                />
              </div>

              {/* Boutons d'action */}
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

export default ProfileEtudiant;
