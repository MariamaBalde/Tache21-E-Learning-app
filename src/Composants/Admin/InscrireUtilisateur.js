// import React, { useState } from 'react';
// import { db, auth } from '../../Config/firebaseConfig';
// import { collection, doc, setDoc } from 'firebase/firestore';
// import {createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
// import { XMarkIcon } from '@heroicons/react/24/outline';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';  // Importer toast
// import 'react-toastify/dist/ReactToastify.css';  // Importer le style CSS de toastify
// const InscrireUtilisateur = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [email, setEmail] = useState('');
//   const [nom, setNom] = useState('');
//   const [prenom, setPrenom] = useState('');
//   const [tel, setTel] = useState('');
//   const [role, setRole] = useState('');
//   const [domaine, setDomaine] = useState('');
//   const [dureeFormation, setDureeFormation] = useState('');

//   const handleRoleChange = (e) => {
//     const selectedRole = e.target.value;
//     setRole(selectedRole);

//     if (selectedRole !== 'etudiant') {
//       setDomaine('');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const password = Math.random().toString(36).slice(-8);

//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       const userRef = doc(collection(db, 'users'), user.uid);
//       const userData = {
//         email,
//         nom,
//         prenom,
//         tel,
//         role,
//         domaine: role === 'etudiant' ? domaine : null,
//         dureeFormation: role === 'etudiant' ? dureeFormation : null,
//         createdAt: new Date(),
//         isActive: true,
//       };
//       await setDoc(userRef, userData);
//       await sendPasswordResetEmail(auth, email);

//       toast.success(`Utilisateur ${role} créé avec succès ! Un e-mail a été envoyé à ${email} pour définir un nouveau mot de passe.`);
//       setEmail('');
//       setNom('');
//       setPrenom('');
//       setTel('');
//       setRole('');
//       setDomaine('');
//       setDureeFormation('');
//     } catch (error) {
//       console.error('Erreur lors de la création de l’utilisateur:', error);
//       toast.error("Erreur lors de l'inscription : " + error.message);
//     }
//   };



//   return (
//   <>
//   </>
//   );
// };
// export default InscrireUtilisateur;

import React, { useState } from 'react';
import { db, auth } from '../../Config/firebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';  // Importer toast
import 'react-toastify/dist/ReactToastify.css';  // Importer le style CSS de toastify


const InscrireUtilisateur = () => {
  const [email, setEmail] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [tel, setTel] = useState('');
  const [role, setRole] = useState('');
  const [domaine, setDomaine] = useState('');
  const [dureeFormation, setDureeFormation] = useState('');
  const [coachEmail, setCoachEmail] = useState('');
  const [showForm, setShowForm] = useState(true);

  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);

    // Réinitialiser la valeur domaine si le rôle change
    if (selectedRole !== 'etudiant') {
      setDomaine('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const password = Math.random().toString(36).slice(-8);

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userRef = doc(collection(db, 'users'), user.uid);
      const userData = {
        email,
        nom,
        prenom,
        tel,
        role,
        domaine: role === 'etudiant' ? domaine : null,
        dureeFormation: role === 'etudiant' ? dureeFormation : null,
        coachEmail: role === 'etudiant' ? coachEmail : null,
        createdAt: new Date(),
        isActive: true,
      };
      await setDoc(userRef, userData);
      await sendPasswordResetEmail(auth, email);

      toast.success(`Utilisateur ${role} créé avec succès ! Un e-mail a été envoyé à ${email} pour définir un nouveau mot de passe.`);
      setEmail('');
      setNom('');
      setPrenom('');
      setTel('');
      setRole('');
      setDomaine('');
      setDureeFormation('');
      setCoachEmail('');
    } catch (error) {
      console.error('Erreur lors de la création de l’utilisateur:', error);
      toast.error("Erreur lors de l'inscription : " + error.message);
    }
  };

  const handleCloseForm = () => {
    navigate('/admin/dashboard');
  };

  return (
    <>
      {showForm && (
        <div className="flex justify-center py-3 items-center h-full bg-blue-300">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
            {/* Bouton de fermeture avec l'icône */}
            <button
              onClick={handleCloseForm}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Inscrire un utilisateur</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Nom</label>
                <input
                  type="text" required
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="w-full border p-2 rounded-lg"
                  placeholder="Nom complet"
                />
              </div>
              <div>
                <label className="block text-gray-700">Prénom</label>
                <input
                  type="text"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  className="w-full border p-2 rounded-lg"
                  placeholder="Prénom"
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border p-2 rounded-lg"
                  placeholder="Adresse email"
                />
              </div>
              <div>
                <label className="block text-gray-700">Téléphone</label>
                <input
                  type="tel"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                  className="w-full border p-2 rounded-lg"
                  placeholder="Numéro de téléphone"
                />
              </div>
              <div>
                <label className="block text-gray-700">Rôle</label>
                <select
                  value={role}
                  onChange={handleRoleChange} // Appel de la logique de réinitialisation
                  className="w-full border p-2 rounded-lg"
                >
                  <option value="">Choisir un rôle</option>
                  <option value="etudiant">Étudiant</option>
                  <option value="coach">Coach</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              {/* Afficher le champ uniquement pour "étudiant" */}
              {role === 'etudiant' && (
                <div>
                  <label className="block text-gray-700">Domaine</label>
                  <select
                    value={domaine}
                    onChange={(e) => setDomaine(e.target.value)}
                    className="w-full border p-2 rounded-lg"
                  >
                    <option value="">Choisir un domaine</option>
                    <option value="Développement Web">Développement Web</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Design et Management">Design et Management</option>
                  </select>
                </div>
              )}
              <div>
                <label className="block text-gray-700">Durée de formation (en mois)</label>
                <input
                  type="number"
                  value={dureeFormation}
                  onChange={(e) => setDureeFormation(e.target.value)}
                  className="w-full border p-2 rounded-lg"
                  placeholder="Durée"
                />
              </div>
              <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700">
                Inscrire
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default InscrireUtilisateur;





