import React, { useState } from 'react';
import { db, auth } from '../../Config/firebaseConfig'; 
import { collection, doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Importation pour la navigation

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

  const navigate = useNavigate(); // Pour la navigation avec react-router

  const handleClose = () => {
    setShowForm(false);
    navigate('/admin/dashboard'); // Rediriger vers la page Admin
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

      alert(`Utilisateur ${role} créé avec succès ! Un e-mail a été envoyé à ${email} pour définir un nouveau mot de passe.`);

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
      alert("Erreur lors de l'inscription : " + error.message);
    }
  };

  if (!showForm) return null;

  return (
    <div className="flex justify-center items-center h-screen bg-blue-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-600 focus:outline-none"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold text-gray-700 mb-4">Inscrire un utilisateur</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Nom</label>
            <input
              type="text"
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
              onChange={(e) => setRole(e.target.value)}
              className="w-full border p-2 rounded-lg"
            >
              <option value="">Choisir un rôle</option>
              <option value="etudiant">Étudiant</option>
              <option value="coach">Coach</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700">
            Inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default InscrireUtilisateur;






// import React, { useState } from 'react';
// import { db, auth } from '../../Config/firebaseConfig'; // Assurez-vous que firebaseConfig est correctement configuré
// import { collection, doc, setDoc } from 'firebase/firestore';
// import { getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

// const InscrireUtilisateur = () => {
//   const [email, setEmail] = useState('');
//   const [nom, setNom] = useState('');
//   const [prenom, setPrenom] = useState('');
//   const [tel, setTel] = useState('');
//   const [role, setRole] = useState('');
//   const [domaine, setDomaine] = useState('');
//   const [dureeFormation, setDureeFormation] = useState('');
//   const [coachEmail, setCoachEmail] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const password = Math.random().toString(36).slice(-8); // Génération du mot de passe temporaire

//       // Créer l'utilisateur dans Firebase Authentication
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Ajouter les informations de l'utilisateur dans Firestore
//       const userRef = doc(collection(db, 'users'), user.uid);
//       const userData = {
//         email,
//         nom,
//         prenom,
//         tel,
//         role,
//         domaine: role === 'etudiant' ? domaine : null,
//         dureeFormation: role === 'etudiant' ? dureeFormation : null,
//         coachEmail: role === 'etudiant' ? coachEmail : null,
//         createdAt: new Date(),
//         isActive: true,
//       };
//       await setDoc(userRef, userData);

//       // Envoyer un e-mail de réinitialisation pour que l'utilisateur puisse changer son mot de passe
//       await sendPasswordResetEmail(auth, email);

//       alert(`Utilisateur ${role} créé avec succès ! Un e-mail a été envoyé à ${email} pour définir un nouveau mot de passe.`);

//       // Réinitialiser le formulaire
//       setEmail('');
//       setNom('');
//       setPrenom('');
//       setTel('');
//       setRole('');
//       setDomaine('');
//       setDureeFormation('');
//       setCoachEmail('');
//     } catch (error) {
//       console.error('Erreur lors de la création de l’utilisateur:', error);
//       alert("Erreur lors de l'inscription : " + error.message);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-blue-300">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold text-gray-700 mb-4">Inscrire un utilisateur</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-gray-700">Nom</label>
//             <input
//               type="text"
//               value={nom}
//               onChange={(e) => setNom(e.target.value)}
//               className="w-full border p-2 rounded-lg"
//               placeholder="Nom complet"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700">Prénom</label>
//             <input
//               type="text"
//               value={prenom}
//               onChange={(e) => setPrenom(e.target.value)}
//               className="w-full border p-2 rounded-lg"
//               placeholder="Prénom"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full border p-2 rounded-lg"
//               placeholder="Adresse email"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700">Téléphone</label>
//             <input
//               type="tel"
//               value={tel}
//               onChange={(e) => setTel(e.target.value)}
//               className="w-full border p-2 rounded-lg"
//               placeholder="Numéro de téléphone"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700">Rôle</label>
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="w-full border p-2 rounded-lg"
//             >
//               <option value="">Choisir un rôle</option>
//               <option value="etudiant">Étudiant</option>
//               <option value="coach">Coach</option>
//               <option value="admin">Admin</option>
//             </select>
//           </div>
//           {role === 'etudiant' && (
//             <>
//               <div>
//                 <label className="block text-gray-700">Domaine</label>
//                 <select
//                   value={domaine}
//                   onChange={(e) => setDomaine(e.target.value)}
//                   className="w-full border p-2 rounded-lg"
//                 >
//                   <option value="">Choisir un domaine</option>
//                   <option value="Développement Web">Développement Web</option>
//                   <option value="Marketing">Marketing</option>
//                   <option value="Design et Management">Design et Management</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-gray-700">Durée de formation (en mois)</label>
//                 <input
//                   type="number"
//                   value={dureeFormation}
//                   onChange={(e) => setDureeFormation(e.target.value)}
//                   className="w-full border p-2 rounded-lg"
//                   placeholder="Durée"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700">Email du coach</label>
//                 <input
//                   type="email"
//                   value={coachEmail}
//                   onChange={(e) => setCoachEmail(e.target.value)}
//                   className="w-full border p-2 rounded-lg"
//                   placeholder="Email du coach"
//                 />
//               </div>
//             </>
//           )}
//           <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700">
//             Inscrire
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default InscrireUtilisateur;
