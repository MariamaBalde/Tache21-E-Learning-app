import React, { useState } from "react";

function Profil({ profile, setProfile, isModalOpen, setIsModalOpen }) {
  // État local pour gérer l'image sélectionnée
  const [selectedImage, setSelectedImage] = useState(profile.image || "https://via.placeholder.com/150");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour contrôler l'affichage du menu
  const [isEditingProfile, setIsEditingProfile] = useState(false); // État pour contrôler l'édition du profil

  // Gestion de la modification des informations du profil
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Gestion du changement de l'image de profil
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result); // Mettre à jour l'aperçu localement
        setProfile((prev) => ({
          ...prev,
          image: reader.result, // Mettre à jour l'image dans l'état partagé
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Sauvegarde des modifications du profil
  const handleSave = () => {
    setIsModalOpen(false);
    alert("Profil mis à jour avec succès !");
  };

  // Si la modal est fermée, on ne rend rien
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-3xl p-8 rounded-lg shadow-lg">
        {/* Section pour changer l'image de profil */}
        <div className="flex flex-col items-center mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Changer votre photo de profil</h3>
          <div className="flex flex-col items-center">
            {/* Aperçu de l'image */}
            <div className="relative">
              <img
                src={selectedImage}
                alt="Aperçu"
                className="w-32 h-32 rounded-full border border-gray-300 mb-4 object-cover cursor-pointer"
              />
            </div>
            <label
              htmlFor="profileImage"
              className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
            >
              Choisir une image
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange} // Gestion du changement d'image
            />
          </div>
        </div>

        {/* Formulaire pour les informations du profil */}
        {isEditingProfile ? (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Modifier le Profil</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Prénom</label>
                <input
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </form>
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium"
              >
                Enregistrer les modifications
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-600">
            <p>Cliquer sur l'image pour accéder au profil.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profil;





// import React, { useState } from "react";

// function Profil({ profile, setProfile, isModalOpen, setIsModalOpen }) {
//   const [selectedImage, setSelectedImage] = useState(profile.image || "https://via.placeholder.com/150");
//   const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour contrôler l'affichage du menu
//   const [isEditingProfile, setIsEditingProfile] = useState(false); // État pour contrôler l'édition du profil

//   // Gestion de la modification des informations du profil
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Gestion du changement de l'image de profil
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setSelectedImage(reader.result);
//         setProfile((prev) => ({
//           ...prev,
//           image: reader.result, // Mise à jour de l'image du profil
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Sauvegarde des modifications du profil
//   const handleSave = () => {
//     setIsModalOpen(false);
//     alert("Profil mis à jour avec succès !");
//   };

//   // Gestion du clic sur l'image de profil pour afficher le menu
//   const handleProfileClick = () => {
//     setIsEditingProfile(true); // Ouvrir le formulaire de modification du profil
//     setIsMenuOpen(false); // Fermer le menu après avoir sélectionné "Profil"
//   };

//   // Fonction pour ouvrir/fermer le menu
//   const handleMenuToggle = () => {
//     setIsMenuOpen((prev) => !prev); // Toggle pour afficher/masquer le menu
//   };

//   // Si la modal est fermée, on ne rend rien
//   if (!isModalOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
//       <div className="bg-white w-full max-w-3xl p-8 rounded-lg shadow-lg">
//         {/* Section pour changer l'image de profil */}
//         <div className="flex flex-col items-center mb-6">
//           <h3 className="text-lg font-medium text-gray-800 mb-4">Changer votre photo de profil</h3>
//           <div className="flex flex-col items-center">
//             {/* Aperçu de l'image */}
//             <div className="relative">
//               <img
//                 src={selectedImage}
//                 alt="Aperçu"
//                 className="w-32 h-32 rounded-full border border-gray-300 mb-4 object-cover cursor-pointer"
//                 onClick={handleMenuToggle} // Ouvrir le menu quand on clique sur l'image
//               />
//               {isMenuOpen && (
//                 <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md w-40">
//                   <ul className="py-2">
//                     <li
//                       onClick={handleProfileClick}
//                       className="px-4 py-2 cursor-pointer hover:bg-gray-200"
//                     >
//                       Profil
//                     </li>
//                     <li className="px-4 py-2 cursor-pointer hover:bg-gray-200">
//                       Paramètres
//                     </li>
//                     <li className="px-4 py-2 cursor-pointer hover:bg-gray-200">
//                       Se déconnecter
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//             <label
//               htmlFor="profileImage"
//               className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
//             >
//               Choisir une image
//             </label>
//             <input
//               type="file"
//               id="profileImage"
//               accept="image/*"
//               className="hidden"
//               onChange={handleImageChange}
//             />
//           </div>
//         </div>

//         {/* Formulaire pour les informations du profil */}
//         {isEditingProfile ? (
//           <>
//             <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Modifier le Profil</h2>
//             <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Prénom</label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={profile.firstName}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Nom</label>
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={profile.lastName}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">N° téléphone</label>
//                 <input
//                   type="text"
//                   name="phone"
//                   value={profile.phone}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Adresse</label>
//                 <input
//                   type="text"
//                   name="address"
//                   value={profile.address}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//               </div>
//             </form>
//             <div className="mt-8 flex justify-center">
//               <button
//                 onClick={handleSave}
//                 className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium"
//               >
//                 Enregistrer les modifications
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="text-center text-gray-600">
//             <p>Cliquer sur l'image pour accéder au profil.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Profil;









// import React from "react";

// function Profil({ profile, setProfile, isModalOpen, setIsModalOpen }) {
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSave = () => {
//     console.log("Profil mis à jour :", profile);
//     setIsModalOpen(false);
//     alert("Profil mis à jour avec succès !");
//   };

//   if (!isModalOpen) return null;

//   return (
//     <div
//       className="absolute right-0 mt-12 bg-blue-100 border border-blue-300 rounded-lg shadow-lg w-64 p-4 z-50"
//       style={{ top: "100%" }}
//     >
//       <h2 className="text-lg font-bold text-gray-800 mb-3">Modifier le Profil</h2>
//       <form className="space-y-2">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Prénom</label>
//           <input
//             type="text"
//             name="firstName"
//             value={profile.firstName}
//             onChange={handleChange}
//             className="w-full px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Nom</label>
//           <input
//             type="text"
//             name="lastName"
//             value={profile.lastName}
//             onChange={handleChange}
//             className="w-full px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
//           <input
//             type="password"
//             name="password"
//             value={profile.password}
//             onChange={handleChange}
//             className="w-full px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//       </form>
//       <div className="flex justify-end mt-3 space-x-2">
//         <button
//           onClick={() => setIsModalOpen(false)}
//           className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
//         >
//           Annuler
//         </button>
//         <button
//           onClick={handleSave}
//           className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Sauvegarder
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Profil;



