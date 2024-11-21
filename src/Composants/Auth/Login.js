import React, { useState } from 'react';
import { auth, db } from '../../Config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import pour la navigation


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Récupérer le rôle de l'utilisateur dans Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role; // Rôle de l'utilisateur

        if (role === 'admin') {
          navigate('/admin/dashboard');
        } else if (role === 'coach') {
          navigate('/coach/dashboard');
        } else if (role === 'etudiant') {
          navigate('/etudiant/dashboard');
        } else {
          throw new Error('Rôle inconnu'); // Erreur si le rôle n'est pas défini
        }
      } else {
        throw new Error('Utilisateur non trouvé dans Firestore');
      }
    } catch (err) {
      setError('Erreur : ' + err.message);
    }
  };
  const fetchUserData = async () => {
    const user = auth.currentUser;
    console.log('Utilisateur connecté :', user);

    if (user) {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      console.log('Données utilisateur Firestore :', userDoc.data());
    } else {
      console.log('Aucun utilisateur connecté.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Connexion
        </h2>
        {error && (
          <p className="mt-4 text-sm text-center text-red-500">{error}</p>
        )}
        <form onSubmit={handleLogin} className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-100 border rounded-md focus:ring focus:ring-indigo-300 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-100 border rounded-md focus:ring focus:ring-indigo-300 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:ring focus:ring-indigo-300 focus:outline-none"
          >
            Se connecter
          </button>
        </form>

        {/* Bouton pour tester l'authentification */}
        <div className="mt-4">
          <button
            onClick={fetchUserData}
            className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-500 focus:ring focus:ring-green-300 focus:outline-none"
          >
            Tester l'authentification
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;



