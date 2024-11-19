// import React, { useState } from 'react';
// import { db } from '../../Config/firebaseConfig';
// import {
//   collection,
//   addDoc,
//   query,
//   where,
//   getDocs,
//   updateDoc,
//   doc,
// } from 'firebase/firestore';
import { sendEmailToStudent, sendEmailToCoach } from './sendEmail';

// const InscrireUtilisateur = () => {
//   const [email, setEmail] = useState('');
//   const [nom, setNom] = useState('');
//   const [prenom, setPrenom] = useState('');
//   const [tel, setTel] = useState('');
//   const [domaine, setDomaine] = useState('');
//   const [dureeFormation, setDureeFormation] = useState('');
//   const [coachEmail, setCoachEmail] = useState('');
//   const [role, setRole] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const userRef = collection(db, 'users');
//       const password = Math.random().toString(36).slice(-8); // Génération d'un mot de passe temporaire
//       const createdAt = new Date();

//       // Vérifier si un utilisateur avec le même email et rôle existe déjà
//       const q = query(
//         userRef,
//         where('email', '==', email),
//         where('role', '==', role)
//       );
//       const querySnapshot = await getDocs(q);

//       if (!querySnapshot.empty) {
//         alert(
//           `Un utilisateur avec l'email "${email}" et le rôle "${role}" existe déjà.`
//         );
//         return;
//       }

//       // Ajout de l'utilisateur selon le rôle
//       if (role === 'etudiant') {
//         await addDoc(userRef, {
//           email,
//           nom,
//           prenom,
//           tel,
//           domaine,
//           dureeFormation,
//           coachEmail,
//           role,
//           createdAt,
//           isActive: true,
//         });

//         // Envoi de l'email à l'étudiant et au coach
//         await sendEmailToStudent(
//           email,
//           `${prenom} ${nom}`,
//           coachEmail,
//           domaine,
//           dureeFormation,
//           createdAt,
//           password
//         );
//         await sendEmailToCoach(
//           coachEmail,
//           `${prenom} ${nom}`,
//           domaine,
//           dureeFormation,
//           createdAt
//         );
//         alert(
//           "Étudiant inscrit avec succès, email envoyé à l'étudiant et au coach !"
//         );
//       } else if (role === 'coach') {
//         await addDoc(userRef, {
//           email,
//           nom,
//           prenom,
//           tel,
//           role,
//           createdAt,
//           password,
//           isActive: true,
//         });

//         // Envoi de l'email au coach
//         const coachMessage = `Bonjour ${prenom} ${nom},\n\nVous avez été inscrit en tant que coach.\nVotre mot de passe temporaire est : ${password}\nBienvenue à bord !`;

//         await sendEmailToCoach(
//           email,
//           `${prenom} ${nom}`,
//           coachMessage,
//           password,
//           createdAt
//         );
//         alert('Coach inscrit avec succès. Bienvenue à bord !');
//       } else if (role === 'admin') {
//         await addDoc(userRef, {
//           email,
//           nom,
//           prenom,
//           role,
//           createdAt,
//           password,
//           isActive: true,
//         });

//         alert('Admin inscrit avec succès. Bienvenue à bord !');
//       }

//       // Réinitialisation des champs
//       setEmail('');
//       setNom('');
//       setPrenom('');
//       setTel('');
//       setDomaine('');
//       setDureeFormation('');
//       setCoachEmail('');
//       setRole('');
//     } catch (error) {
//       alert("Erreur lors de l'inscription : " + error.message);
//     }
//   };

//   const toggleActivation = async (userId, currentStatus) => {
//     try {
//       const userDoc = doc(db, 'users', userId);
//       await updateDoc(userDoc, { isActive: !currentStatus });
//       alert(
//         `Utilisateur ${!currentStatus ? 'activé' : 'désactivé'} avec succès !`
//       );
//     } catch (error) {
//       console.error("Erreur lors de l'activation/désactivation :", error);
//       alert("Impossible de mettre à jour l'état de l'utilisateur.");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-blue-300">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold text-gray-700 mb-4">
//           Inscrire un utilisateur
//         </h2>
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
//                   <option value="Design et Management">
//                     Design et Management
//                   </option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-gray-700">
//                   Durée de formation (en mois)
//                 </label>
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

//           <button
//             type="submit"
//             className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700"
//           >
//             Inscrire
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default InscrireUtilisateur;

import React, { useState } from 'react';
import { db, auth } from '../../Config/firebaseConfig'; // Assurez-vous que firebaseConfig est correctement configuré
import { collection, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const InscrireUtilisateur = () => {
  const [email, setEmail] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [tel, setTel] = useState('');
  const [role, setRole] = useState('');
  const [domaine, setDomaine] = useState('');
  const [dureeFormation, setDureeFormation] = useState('');
  const [coachEmail, setCoachEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const password = Math.random().toString(36).slice(-8); // Mot de passe temporaire

      // Créer l'utilisateur dans Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Ajouter les informations dans Firestore
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

      alert(`Utilisateur ${role} créé avec succès ! Un email a été envoyé avec les informations.`);
      setEmail('');
      setNom('');
      setPrenom('');
      setTel('');
      setRole('');
      setDomaine('');
      setDureeFormation('');
      setCoachEmail('');
    } catch (error) {
      alert("Erreur lors de l'inscription : " + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Inscrire un utilisateur
        </h2>
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
          {role === 'etudiant' && (
            <>
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
                  <option value="Design et Management">
                    Design et Management
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700">
                  Durée de formation (en mois)
                </label>
                <input
                  type="number"
                  value={dureeFormation}
                  onChange={(e) => setDureeFormation(e.target.value)}
                  className="w-full border p-2 rounded-lg"
                  placeholder="Durée"
                />
              </div>
              <div>
                <label className="block text-gray-700">Email du coach</label>
                <input
                  type="email"
                  value={coachEmail}
                  onChange={(e) => setCoachEmail(e.target.value)}
                  className="w-full border p-2 rounded-lg"
                  placeholder="Email du coach"
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700"
          >
            Inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default InscrireUtilisateur;

