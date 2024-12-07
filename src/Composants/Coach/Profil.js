import React, { useState, useEffect } from 'react';

function Profil() {
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

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('profileData'));
    if (savedData) {
      setFormData(savedData.formData || {});
      setProfileImage(savedData.profileImage || 'https://via.placeholder.com/100');
      setIsProfileEdited(true);
    }
  }, []);

  const saveProfileData = () => {
    const profileData = {
      formData,
      profileImage,
    };
    localStorage.setItem('profileData', JSON.stringify(profileData));
  };

  const toggleModal = () => setModalOpen(!isModalOpen);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageBase64 = reader.result; // Convertir l'image en base64
        setProfileImage(imageBase64);
        localStorage.setItem(
          'profileData',
          JSON.stringify({ formData, profileImage: imageBase64 })
        ); // Sauvegarder immédiatement
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProfileEdited(true);
    saveProfileData();
    toggleModal();
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const openProfileModal = () => {
    toggleMenu();
    toggleModal();
  };

  return (
    <div className="relative flex items-center">
      <div>
        <img
          src={profileImage}
          alt="Photo de profil"
          className="w-8 h-8 rounded-full object-cover border border-gray-300 cursor-pointer"
          onClick={toggleMenu}
        />
        {menuOpen && (
          <div className="absolute bg-white rounded-lg shadow w-32 top-full right-0 z-10">
            <ul className="py-2 text-sm text-gray-950">
              <li>
                <a href="#" onClick={openProfileModal} className="block px-4 py-2">
                  Profil
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2">
                  Settings
                </a>
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
        <button onClick={toggleModal} className="ml-2 p-1 bg-blue-500 text-white rounded-full text-xs">
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
