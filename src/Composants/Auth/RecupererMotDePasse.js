// src/Composants/Auth/RecupererMotDePasse.js
import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../Config/firebaseConfig'; // Importer la configuration de Firebase
import { useNavigate } from "react-router-dom"; // Remplacer useHistory par useNavigate


const RecupererMotDePasse = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Utilisation de useNavigate

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Un email de réinitialisation a été envoyé !");
      setTimeout(() => {
        navigate("/"); // Redirige vers la page de connexion après 3 secondes
      }, 3000);
    } catch (err) {
      setError("Erreur : " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="w-96 bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-royal-blue">
          Réinitialiser le mot de passe
        </h2>
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Adresse email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-royal-blue focus:border-royal-blue"
            />
          </div>
          {message && <p className="text-green-500 text-center">{message}</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-royal-blue text-white py-2 px-4 rounded hover:bg-light-blue focus:outline-none focus:ring focus:ring-light-blue"
          >
            Réinitialiser
          </button>
        </form>
        <p className="mt-4 text-center">
          <a
            href="/"
            className="text-royal-blue underline hover:text-light-blue"
          >
            Retour à la connexion
          </a>
        </p>
      </div>
    </div>
  );
};

export default RecupererMotDePasse;



// const RecupererMotDePasse = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     try {
//       await sendPasswordResetEmail(auth, email);
//       setMessage('Un email de réinitialisation a été envoyé.');
//       setError('');
//     } catch (err) {
//       setError("Erreur lors de l'envoi du mail.");
//       setMessage('');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded shadow-lg max-w-sm w-full">
//         <h2 className="text-2xl font-bold mb-4">Récupérer le Mot de Passe</h2>
//         {message && <div className="text-green-500 mb-4">{message}</div>}
//         {error && <div className="text-red-500 mb-4">{error}</div>}
//         <form onSubmit={handleResetPassword}>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="w-full p-2 border border-gray-300 rounded mt-1"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white p-2 rounded"
//           >
//             Réinitialiser
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RecupererMotDePasse;
