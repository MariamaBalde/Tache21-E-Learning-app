import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Config/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Config/firebaseConfig';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setError('');

  //   try {
  //     const userCredential = await signInWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     const user = userCredential.user;

  //     const userDoc = await getDoc(doc(db, 'users', user.uid));
  //     if (userDoc.exists()) {
  //       const userData = userDoc.data();
  //       const role = userData.Role;
  //       const status = userData.status; // Vérifier le statut de l'utilisateur

  //       if (status === 'désactivé') {
  //         throw new Error(
  //           "Votre compte a été désactivé. Veuillez contacter l'administrateur."
  //         );
  //       }

  //       // Vérification du rôle de l'utilisateur
  //       if (role === 'admin') {
  //         navigate('/admin/dashboard');
  //       } else if (role === 'coach') {
  //         navigate('/coach/dashboard');
  //       } else if (role === 'etudiant') {
  //         navigate('/etudiant/dashboard');
  //       } else {
  //         throw new Error('Rôle inconnu');
  //       }
  //     } else {
  //       throw new Error('Utilisateur non trouvé dans la base de données');
  //     }
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.Role;
        const status = userData.status;

        if (status === "désactivé") {
          throw new Error("Votre compte a été désactivé. Veuillez contacter l'administrateur.");
        }

        if (role === "admin") {
          navigate("/admin/dashboard");
        } else if (role === "coach") {
          navigate("/coach/dashboard");
        } else if (role === "etudiant") {
          navigate("/etudiant/dashboard");
        } else {
          throw new Error("Rôle inconnu.");
        }
      } else {
        throw new Error("Utilisateur non trouvé dans la base de données.");
      }
    } catch (err) {
      console.error("Erreur de connexion :", err.code, err.message);
      switch (err.code) {
        case "auth/invalid-email":
          setError("L'email est invalide.");
          break;
        case "auth/user-not-found":
          setError("Utilisateur introuvable.");
          break;
        case "auth/wrong-password":
          setError("Mot de passe incorrect.");
          break;
        case "auth/invalid-credential":
          setError("Crédential Firebase invalide. Vérifiez la configuration.");
          break;
        default:
          setError(err.message);
      }
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
      </div>
    </div>
  );
};

export default Login;
