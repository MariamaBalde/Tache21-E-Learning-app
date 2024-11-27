import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';

function Profil() {
  // États locaux pour gérer les données du profil et l'ouverture du modal
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
  const [isProfileEdited, setIsProfileEdited] = useState(false); // Vérifier si le profil est modifié
  const [menuOpen, setMenuOpen] = useState(false); // Contrôler l'affichage du menu

  // Charger les données depuis le localStorage au démarrage du composant
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('profileData'));
    if (savedData) {
      setFormData(savedData.formData);
      setProfileImage(savedData.profileImage || 'https://via.placeholder.com/100');
      setIsProfileEdited(true);
    }
  }, []);

  // Sauvegarder les données dans le localStorage
  const saveProfileData = () => {
    const profileData = {
      formData,
      profileImage,
    };
    localStorage.setItem('profileData', JSON.stringify(profileData));
  };

  // Fonction pour ouvrir ou fermer le modal
  const toggleModal = () => setModalOpen(!isModalOpen);

  // Fonction pour gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fonction pour gérer l'upload d'une nouvelle image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
    }
  };

  // Fonction pour soumettre les données
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Données modifiées :', formData);
    setIsProfileEdited(true); // Marquer le profil comme modifié
    saveProfileData(); // Sauvegarder les modifications dans le localStorage
    toggleModal(); // Fermer le modal après soumission
  };

  // Fonction pour afficher ou masquer le menu
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Fonction pour ouvrir le modal de modification
  const openProfileModal = () => {
    toggleMenu(); // Fermer le menu
    toggleModal(); // Ouvrir le modal
  };

  return (
    <div className="relative flex items-center">
      {/* Photo de profil avec menu déroulant */}
      <div>
        <img
          src={profileImage}
          alt="Photo de profil"
          className="w-8 h-8 rounded-full object-cover border border-gray-300 cursor-pointer"
          onClick={toggleMenu} // Affiche le menu déroulant quand on clique sur l'image
        />
        {/* Menu déroulant avec Profil, Settings, Déconnecter */}
        {menuOpen && (
          <div className="absolute bg-white rounded-lg shadow w-32 top-full right-0 z-10">
            <ul className="py-2 text-sm text-gray-950">
              <li>
                <a
                  href="#"
                  onClick={openProfileModal} // Ouvre le modal quand on clique sur Profil
                  className="block px-4 py-2"
                >
                  Profil
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2">
                  Settings
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2">
                  Déconnecter
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Affichage dynamique du nom et prénom ou champ vide */}
      {isProfileEdited ? (
        <div className="ml-2 text-sm">
          <span>{formData.nom} {formData.prenom}</span>
        </div>
      ) : (
        <button onClick={toggleModal} className="ml-2 p-1 bg-blue-500 text-white rounded-full text-xs">
          Modifier
        </button>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-lg font-bold mb-4">Modifier le Profil</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de Téléphone</label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                <input
                  type="adress"
                  name="adess"
                  value={formData.adress}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Photo de Profil</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
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
