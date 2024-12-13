import React from 'react';
import Messagerie from '../Messagerie'; // Assurez-vous que le chemin est correct
import { useAuth } from '../../Hooks/useAuth'; // Importer le hook d'authentification

const MessagerieEtudiant = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>Chargement...</p>; // Afficher un message de chargement si l'utilisateur n'est pas authentifié
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Messagerie Étudiant</h1>
      <Messagerie />
    </div>
  );
};

export default MessagerieEtudiant;


// import React, { useEffect, useState } from 'react';
// import { db } from '../../Config/firebaseConfig';
// import { collection, addDoc, onSnapshot, orderBy, query } from 'firebase/firestore';

// const MessagerieEtudiant = ({ currentUserId }) => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [selectedCoachId, setSelectedCoachId] = useState(null);
//   const [coachs, setCoachs] = useState([]);

//   useEffect(() => {
//     const q = query(collection(db, 'users'));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const coachData = snapshot.docs
//         .map(doc => ({ id: doc.id, ...doc.data() }))
//         .filter(user => user.role === 'coach');
//       setCoachs(coachData);
//     });
//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     if (selectedCoachId) {
//       const q = query(collection(db, 'messages'), orderBy('timestamp'));
//       const unsubscribe = onSnapshot(q, (snapshot) => {
//         const msgs = snapshot.docs
//           .map(doc => ({ id: doc.id, ...doc.data() }))
//           .filter(msg => 
//             (msg.senderId === selectedCoachId && msg.receiverId === currentUserId) ||
//             (msg.senderId === currentUserId && msg.receiverId === selectedCoachId)
//           );
//         setMessages(msgs);
//       });
//       return () => unsubscribe();
//     }
//   }, [selectedCoachId, currentUserId]);

//   const sendMessage = async (e) => {
//     e.preventDefault();
//     if (input && selectedCoachId) {
//       try {
//         await addDoc(collection(db, 'messages'), {
//           senderId: currentUserId,
//           receiverId: selectedCoachId,
//           text: input,
//           timestamp: new Date(),
//         });
//         setInput('');
//       } catch (error) {
//         alert("Erreur lors de l'envoi du message : " + error.message);
//       }
//     } else {
//       alert("Veuillez remplir tous les champs nécessaires.");
//     }
//   };

//   return (
//     <div className="flex h-full bg-gray-100">
//       <div className="w-1/3 p-4 border-r bg-white shadow-lg">
//         <h2 className="text-xl font-bold mb-4">Coachs</h2>
//         <div className="overflow-y-auto h-80">
//           {coachs.map(coach => (
//             <div 
//               key={coach.id} 
//               className="p-2 hover:bg-gray-200 rounded cursor-pointer" 
//               onClick={() => setSelectedCoachId(coach.id)}
//             >
//               {coach.nom} {coach.prenom}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex-1 p-4">
//         <h2 className="text-xl font-bold mb-4">Discussion</h2>
//         {selectedCoachId ? (
//           <>
//             <div className="flex-1 overflow-y-auto h-80 border bg-white rounded-lg shadow p-4">
//               {messages.map(msg => (
//                 <div key={msg.id} className={`mb-2 p-2 rounded-lg ${msg.senderId === currentUserId ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
//                   <span className="font-bold">{msg.senderId}: </span>
//                   {msg.text}
//                 </div>
//               ))}
//             </div>
//             <form onSubmit={sendMessage} className="flex mt-4">
//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 className="flex-1 border border-gray-300 p-2 rounded-lg"
//                 placeholder="Écrire un message..."
//               />
//               <button type="submit" className="ml-2 bg-blue-500 text-white p-2 rounded-lg">Envoyer</button>
//             </form>
//           </>
//         ) : (
//           <div className="text-gray-400">Sélectionnez un coach pour commencer la discussion.</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MessagerieEtudiant;