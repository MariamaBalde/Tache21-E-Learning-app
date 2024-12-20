// import React, { useEffect, useState } from 'react';
// import { db, auth } from '../../Config/firebaseConfig';
// import {
//   collection,
//   getDocs,
//   updateDoc,
//   doc,
//   deleteDoc,
//   setDoc,
//   getDoc,
// } from 'firebase/firestore';
// import Navbar from '../Admin/Navbar';
// import { useNavigate } from 'react-router-dom';
// import GradientCard from '../Coach/GradientCard';
// import { Users, GraduationCap, UserCheck } from 'lucide-react';
// import Loader from '../Shared/Loader'; // Importer le composant Loader
// import { toast, ToastContainer } from 'react-toastify'; // Importer Toastify
// import 'react-toastify/dist/ReactToastify.css'; // Importer les styles de Toastify
// import { XMarkIcon } from '@heroicons/react/24/outline';
// import { createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

// const Dashboard = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [email, setEmail] = useState('');
//   const [nom, setNom] = useState('');
//   const [prenom, setPrenom] = useState('');
//   const [tel, setTel] = useState('');
//   const [role, setRole] = useState('');
//   const [domaine, setDomaine] = useState('');
//   const [dureeFormation, setDureeFormation] = useState('');
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   const navigate = useNavigate();

//   // Vérification de l'authentification
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (user) => {
//         console.log('Utilisateur actuel:', user);
//         if (!user) {
//             navigate(''); // Rediriger vers la landing page si l'utilisateur n'est pas authentifié
//         } else {
//             const userRef = doc(db, 'users', user.uid);
//             const docSnap = await getDoc(userRef);
//             if (docSnap.exists()) {
//                 const userData = docSnap.data();
//                 if (userData.role !== 'admin') {
//                     navigate('/admin/dashboard'); // Rediriger si l'utilisateur n'est pas admin
//                 }
//             } else {
//                 navigate('/'); // Rediriger si le document utilisateur n'existe pas
//             }
//         }
//     });

//     return () => unsubscribe(); // Nettoyage de l'abonnement
// }, [navigate]);


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
//         // Créer un mot de passe temporaire
//         const password = Math.random().toString(36).slice(-8);

//         // Créer un utilisateur avec un mot de passe temporaire sans se connecter
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         const user = userCredential.user;
//         console.log('Nouvel utilisateur créé:', user);

//         // Enregistrer les informations de l'utilisateur dans Firestore
//         const userRef = doc(collection(db, 'users'), user.uid);
//         const userData = {
//             email,
//             nom,
//             prenom,
//             tel,
//             role,
//             domaine: role === 'etudiant' ? domaine : null,
//             dureeFormation: role === 'etudiant' ? dureeFormation : null,
//             createdAt: new Date(),
//             isActive: true,
//         };
//         await setDoc(userRef, userData);

//         // Envoyer un email de réinitialisation du mot de passe
//         await sendPasswordResetEmail(auth, email);

//         // Afficher un message de confirmation à l'admin
//         alert(`Utilisateur ${role} créé avec succès ! Un e-mail a été envoyé à ${email} pour définir un nouveau mot de passe.`);

//         // Réinitialiser les champs du formulaire
//         setEmail('');
//         setNom('');
//         setPrenom('');
//         setTel('');
//         setRole('');
//         setDomaine('');
//         setDureeFormation('');

//         // Fermer le modal sans perturber l'admin connecté
//         setModalOpen(false);

//         // L'admin reste sur la même page et n'est pas redirigé
//         // Si le rôle de l'utilisateur est 'admin', on le redirige, sinon on ne fait rien
//         if (role === 'admin') {
//             navigate('/admin/dashboard'); // Rediriger si l'utilisateur créé est un admin
//         }
        
//     } catch (error) {
//         console.error('Erreur lors de la création de l’utilisateur:', error);
//         alert("Erreur lors de l'inscription : " + error.message);
//     }
// };



  

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const usersCollection = collection(db, 'users');
//       const userSnapshot = await getDocs(usersCollection);
//       const userList = userSnapshot.docs.map((doc) => {
//         const data = { id: doc.id, ...doc.data() };
//         if (data.createdAt && typeof data.createdAt.toDate === 'function') {
//           data.createdAt = data.createdAt.toDate().toLocaleString();
//         }
//         return data;
//       });
//       setUsers(userList);
//       setLoading(false); // Changer l'état de chargement à false après avoir récupéré les données
//     };

//     fetchUsers();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
//       return;
//     }
//     try {
//       await deleteDoc(doc(db, 'users', id));
//       setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
//       toast.success("Utilisateur supprimé avec succès !");
//     } catch (error) {
//       console.error('Erreur lors de la suppression de l’utilisateur :', error);
//       toast.error("Une erreur est survenue lors de la suppression. Veuillez réessayer.");
//     }
//   };

//   const handleToggleStatus = async (id, currentStatus) => {
//     try {
//       const userDoc = doc(db, 'users', id);
//       await updateDoc(userDoc, {
//         isActive: !currentStatus,
//       });
//       setUsers((prevUsers) =>
//         prevUsers.map((user) =>
//           user.id === id ? { ...user, isActive: !currentStatus } : user
//         )
//       );
//     } catch (error) {
//       console.error('Erreur lors de la modification du statut de l’utilisateur :', error);
//     }
//   };

//   const renderTable = (title, userList) => (
//     <div className="bg-white rounded-lg shadow p-4 mb-6">
//       <h2 className="text-lg font-bold mb-4">{title}</h2>
//       <div className="overflow-x-auto">
//         <table className="table-auto w-full">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="px-4 py-2 text-left">Nom</th>
//               <th className="px-4 py-2 text-left">Prénom</th>
//               <th className="px-4 py-2 text-left">E-mail</th>
//               <th className="px-4 py-2 text-left">Date d'inscription</th>
//               <th className="px-4 py-2 text-left">Statut</th>
//               <th className="px-4 py-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {userList.map((user) => (
//               <tr key={user.id} className="border-t">
//                 <td className="px-4 py-2">{user.nom}</td>
//                 <td className="px-4 py-2">{user.prenom}</td>
//                 <td className="px-4 py-2">{user.email}</td>
//                 <td className="px-4 py-2">{user.createdAt}</td>
//                 <td className="px-4 py-2">
//                   {user.isActive ? (
//                     <span className="text-green-500 font-bold">Actif</span>
//                   ) : (
//                     <span className="text-red-500 font-bold">Inactif</span>
//                   )}
//                 </td>
//                 <td className="px-4 py-2">
//                   <button
//                     onClick={() => handleDelete(user.id)}
//                     className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mr-2"
//                   >
//                     Supprimer
//                   </button>
//                   <button
//                     onClick={() => handleToggleStatus(user.id, user.isActive)}
//                     className={`${user.isActive ? 'bg-gray-500' : 'bg-green-500'
//                       } text-white px-2 py-1 rounded hover:bg-green-600`}
//                   >
//                     {user.isActive ? 'Désactiver' : 'Activer'}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   if (loading) {
//     return <Loader />; // Afficher le loader pendant le chargement
//   }

//   const students = users.filter((user) => user.role === 'etudiant');
//   const coaches = users.filter((user) => user.role === 'coach');
//   const admins = users.filter((user) => user.role === 'admin');

//   const handleCloseModal = () => {
//     setModalOpen(false);
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       <Navbar />
//       <div className="mt-16 p-4 lg:p-8 flex-1 overflow-y-auto">
//         <h1 className="text-2xl font-bold mb-6">Tableau de Bord Admin</h1>
//         <div className="bg-white rounded-lg shadow p-6 mb-8">
//           <div className="flex flex-col sm:flex-row sm:space-x-5 space-y-3 sm:space-y-0">
//             <button
//               onClick={() => setModalOpen(true)}
//               className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//             >
//               Inscrire un utilisateur
//             </button>

//             <button
//               onClick={() => navigate('/admin/domaine')}
//               className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//             >
//               All domaines
//             </button>
//           </div>
//         </div>

//         {modalOpen && (
//           <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex justify-center items-center z-50">
//             <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
//               <button
//                 onClick={handleCloseModal}
//                 className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
//               >
//                 <XMarkIcon className="h-6 w-6" />
//               </button>
//               <h2 className="text-lg font-semibold mb-4">Inscription d'un utilisateur</h2>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label className="block text-gray-700">Nom</label>
//                   <input
//                     type="text"
//                     value={nom}
//                     onChange={(e) => setNom(e.target.value)}
//                     className="w-full border p-2 rounded-lg"
//                     placeholder="Nom complet"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700">Prénom</label>
//                   <input
//                     type="text"
//                     value={prenom}
//                     onChange={(e) => setPrenom(e.target.value)}
//                     className="w-full border p-2 rounded-lg"
//                     placeholder="Prénom"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700">Email</label>
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full border p-2 rounded-lg"
//                     placeholder="Adresse email"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700">Téléphone</label>
//                   <input
//                     type="tel"
//                     value={tel}
//                     onChange={(e) => setTel(e.target.value)}
//                     className="w-full border p-2 rounded-lg"
//                     placeholder="Numéro de téléphone"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700">Rôle</label>
//                   <select
//                     value={role}
//                     onChange={handleRoleChange}
//                     className="w-full border p-2 rounded-lg"
//                   >
//                     <option value="">Choisir un rôle</option>
//                     <option value="etudiant">Étudiant</option>
//                     <option value="coach">Coach</option>
//                     <option value="admin">Admin</option>
//                   </select>
//                 </div>
//                 {role === 'etudiant' && (
//                   <div>
//                     <label className="block text-gray-700">Domaine</label>
//                     <select
//                       value={domaine}
//                       onChange={(e) => setDomaine(e.target.value)}
//                       className="w-full border p-2 rounded-lg"
//                     >
//                       <option value="">Choisir un domaine</option>
//                       <option value="Développement Web">Développement Web</option>
//                       <option value="Marketing">Marketing</option>
//                       <option value="Design et Management">Design et Management</option>
//                     </select>
//                   </div>
//                 )}
//                 <div>
//                   <label className="block text-gray-700">Durée de formation (en mois)</label>
//                   <input
//                     type="number"
//                     value={dureeFormation}
//                     onChange={(e) => setDureeFormation(e.target.value)}
//                     className="w-full border p-2 rounded-lg"
//                     placeholder="Durée"
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700"
//                 > 
//                   Inscrire
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//           <GradientCard
//             title={`Total Utilisateurs ${users.length}`}
//             icon={Users}
//             gradient="bg-gradient-to-br from-blue-600 to-blue-300"
//           />
//           <GradientCard
//             title={`Étudiants ${students.length}`}
//             icon={GraduationCap}
//             gradient="bg-gradient-to-br from-blue-300 to-[#FF66FF]"
//           />
//           <GradientCard
//             title={`Coachs ${coaches.length}`}
//             icon={UserCheck}
//             gradient="bg-gradient-to-br from-blue-200 to-blue-800"
//           />
//         </div>

//         {renderTable('Étudiants', students)}
//         {renderTable('Coachs', coaches)}
//         {renderTable('Administrateurs', admins)}
//       </div>

//       <ToastContainer /> {/* Ajouter ToastContainer pour afficher les notifications */}
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import { db } from '../../Config/firebaseConfig';
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import Navbar from '../Admin/Navbar';
import { useNavigate } from 'react-router-dom';
import GradientCard from '../Coach/GradientCard';
import { Users, GraduationCap, UserCheck } from 'lucide-react';
import Loader from '../Shared/Loader'; // Importer le composant Loader
import { toast, ToastContainer } from 'react-toastify'; // Importer Toastify
import 'react-toastify/dist/ReactToastify.css'; // Importer les styles de Toastify



const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // État de chargement
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map((doc) => {
        const data = { id: doc.id, ...doc.data() };
        if (data.createdAt && typeof data.createdAt.toDate === 'function') {
          data.createdAt = data.createdAt.toDate().toLocaleString();
        }
        return data;
      });
      setUsers(userList);
      setLoading(false); // Changer l'état de chargement à false après avoir récupéré les données
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      return;
    }
    try {
      await deleteDoc(doc(db, 'users', id));
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      toast.success("Utilisateur supprimé avec succès !");
    } catch (error) {
      console.error('Erreur lors de la suppression de l’utilisateur :', error);
      toast.error("Une erreur est survenue lors de la suppression. Veuillez réessayer.");
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const userDoc = doc(db, 'users', id);
      await updateDoc(userDoc, {
        isActive: !currentStatus,
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, isActive: !currentStatus } : user
        )
      );
    } catch (error) {
      console.error(
        'Erreur lors de la modification du statut de l’utilisateur :',
        error
      );
    }
  };

  const renderTable = (title, userList) => (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Nom</th>
              <th className="px-4 py-2 text-left">Prénom</th>
              <th className="px-4 py-2 text-left">E-mail</th>
              <th className="px-4 py-2 text-left">Date d'inscription</th>
              <th className="px-4 py-2 text-left">Statut</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-2">{user.nom}</td>
                <td className="px-4 py-2">{user.prenom}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.createdAt}</td>
                <td className="px-4 py-2">
                  {user.isActive ? (
                    <span className="text-green-500 font-bold">Actif</span>
                  ) : (
                    <span className="text-red-500 font-bold">Inactif</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mr-2"
                  >
                    Supprimer
                  </button>
                  <button
                    onClick={() => handleToggleStatus(user.id, user.isActive)}
                    className={`${user.isActive ? 'bg-gray-500' : 'bg-green-500'
                      } text-white px-2 py-1 rounded hover:bg-green-600`}
                  >
                    {user.isActive ? 'Désactiver' : 'Activer'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (loading) {
    return <Loader />; // Afficher le loader pendant le chargement
  }

  const students = users.filter((user) => user.role === 'etudiant');
  const coaches = users.filter((user) => user.role === 'coach');
  const admins = users.filter((user) => user.role === 'admin');

  return (
    <div className="flex flex-col h-screen">
      <div className="">
        <Navbar />
      </div>

      <div className="mt-16 p-4 lg:p-8 flex-1 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Tableau de Bord Admin</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:space-x-5 space-y-3 sm:space-y-0">
            <button
              onClick={() => navigate('/admin/inscrire-utilisateur')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Inscrire un utilisateur
            </button>

            <button
              onClick={() => navigate('/admin/domaine')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              All domaines
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <GradientCard
            title={`Total Utilisateurs
               ${users.length}`}
            icon={Users}
            gradient="bg-gradient-to-br from-blue-600 to-blue-300"
          />
          <GradientCard
            title={`Étudiants
               ${students.length}`}
            icon={GraduationCap}
            gradient="bg-gradient-to-br from-blue-300 to-[#FF66FF]"
          />
          <GradientCard
            title={`Coachs
               ${coaches.length}`}
            icon={UserCheck}
            gradient="bg-gradient-to-br from-blue-200 to-blue-800"
          />
        </div>

        {renderTable('Étudiants', students)}
        {renderTable('Coachs', coaches)}
        {renderTable('Administrateurs', admins)}
      </div>

      <ToastContainer /> {/* Ajouter ToastContainer pour afficher les notifications */}
    </div>
  );
};

export default AdminDashboard;
