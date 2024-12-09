import React, { useState } from 'react';
import { auth, db } from '../../Config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import pour la navigation
import image1 from '../../Images/ImagesAdmin/logini.webp';
import logoSite from '../../Images/ImagesAdmin/1.png';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // État pour contrôler la visibilité du mot de passe
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Récupérer le rôle de l'utilisateur dans Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role;

        // Stockez les informations de l'utilisateur dans localStorage
        localStorage.setItem(
          "userData",
          JSON.stringify({
            name: `${userData.nom} ${userData.prenom}`, // Nom complet
            role: role,
            email: userData.email,
          })
        );

        // Redirigez vers le bon tableau de bord
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else if (role === "coach") {
          navigate("/coach/dashboard");
        } else if (role === "etudiant") {
          navigate("/etudiant/dashboard");
        } else {
          throw new Error("Rôle inconnu");
        }
      } else {
        throw new Error("Utilisateur non trouvé dans Firestore");
      }
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        setError(
          <>
            Mot de passe incorrect.
            <a href="/reset-password" className="text-royal-blue underline ml-1">
              Mot de passe oublié ?
            </a>
          </>
        );
      } else if (err.code === "auth/user-not-found") {
        setError("Aucun utilisateur trouvé avec cet e-mail.");
      } else {
        setError("Erreur : " + err.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 relative overflow-hidden">
      {/* Conteneur principal */}
      <div className="relative w-10/12 max-w-2xl bg-white shadow-lg overflow-hidden rounded-lg flex flex-col lg:flex-row">
        {/* Section gauche avec illustration */}
        <div className="hidden lg:flex relative w-1/2 bg-gradient-to-tr from-royal-blue to-light-blue items-center justify-center">
          <img
            src={image1}
            alt="Illustration de collaboration"
            className="w-3/4"
          />
        </div>

        {/* Section droite avec formulaire */}
        <div className="w-full lg:w-1/2 p-6">
          <h2 className="text-2xl font-bold text-center text-royal-blue mb-4">
            Bienvenue !
          </h2>
          <div className="flex justify-center mb-4">
            <img
              src={logoSite}
              alt="Logo de notre site e-learning"
              className="w-1/3 sm:w-1/4 lg:w-1/2"
            />
          </div>
          <form onSubmit={handleLogin}>
            {/* Champ Email */}
            <div className="mb-4">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="📧 E-mail"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-light-blue focus:border-light-blue"
              />
            </div>

            {/* Champ Mot de passe */}
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"} // Change le type de l'input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="🔐 Mot de passe"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-light-blue focus:border-light-blue"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-royal-blue"
              >
                {showPassword ? "👁️" : "🙈"} {/* Change l'icône selon l'état */}
              </button>
            </div>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}

            <div className="mb-3 text-right">
              <a href="/reset-password" className="text-royal-blue underline">
                Mot de passe oublié
              </a>
            </div>
            {/* Bouton Se connecter */}
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-royal-blue rounded-md hover:bg-light-blue focus:outline-none focus:ring focus:ring-light-blue"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
