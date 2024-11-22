import React, { useState } from 'react';
import { auth, db } from '../../Config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import pour la navigation


// import React, { useState } from 'react';
// import { auth, db } from '../../Config/firebaseConfig';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { doc, getDoc } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';

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
        const role = userData.role;

        if (role === 'admin') {
          navigate('/admin/dashboard');
        } else if (role === 'coach') {
          navigate('/coach/dashboard');
        } else if (role === 'etudiant') {
          navigate('/etudiant/dashboard');
        } else {
          throw new Error('Rôle inconnu');
        }
      } else {
        throw new Error('Utilisateur non trouvé dans Firestore');
      }
    } catch (err) {
      setError('Erreur : ' + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="flex flex-col md:flex-row w-11/12 max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Section gauche */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center">Login to your account</h2>
          {error && (
            <p className="mt-4 text-center text-sm text-red-500">{error}</p>
          )}
          <form onSubmit={handleLogin} className="mt-6">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
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
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-100 border rounded-md focus:ring focus:ring-indigo-300 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:ring focus:ring-indigo-300 focus:outline-none"
            >
              Log in
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">Login with</p>
            <div className="flex justify-center gap-4 mt-2">
              <button className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-500">
                F
              </button>
              <button className="p-2 rounded-full bg-red-600 text-white hover:bg-red-500">
                G
              </button>
              <button className="p-2 rounded-full bg-blue-800 text-white hover:bg-blue-700">
                L
              </button>
            </div>
          </div>
        </div>

        {/* Section droite */}
        <div className="hidden md:flex md:w-1/2 bg-gray-100 justify-center items-center">
          <img
            src="path-to-your-image.svg"
            alt="Illustration"
            className="w-4/5 h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;


// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Récupérer le rôle de l'utilisateur dans Firestore
//       const userDoc = await getDoc(doc(db, 'users', user.uid));
//       if (userDoc.exists()) {
//         const userData = userDoc.data();
//         const role = userData.role; // Rôle de l'utilisateur

//         if (role === 'admin') {
//           navigate('/admin/dashboard');
//         } else if (role === 'coach') {
//           navigate('/coach/dashboard');
//         } else if (role === 'etudiant') {
//           navigate('/etudiant/dashboard');
//         } else {
//           throw new Error('Rôle inconnu'); // Erreur si le rôle n'est pas défini
//         }
//       } else {
//         throw new Error('Utilisateur non trouvé dans Firestore');
//       }
//     } catch (err) {
//       setError('Erreur : ' + err.message);
//     }
//   };


//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
//         <h2 className="text-2xl font-bold text-center text-gray-800">
//           Connexion
//         </h2>
//         {error && (
//           <p className="mt-4 text-sm text-center text-red-500">{error}</p>
//         )}
//         <form onSubmit={handleLogin} className="mt-6">
//           <div className="mb-4">
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-600"
//             >
//               E-mail
//             </label>
//             <input
//               type="email"
//               id="email"
//               placeholder="E-mail"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-100 border rounded-md focus:ring focus:ring-indigo-300 focus:outline-none"
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-600"
//             >
//               Mot de passe
//             </label>
//             <input
//               type="password"
//               id="password"
//               placeholder="Mot de passe"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-100 border rounded-md focus:ring focus:ring-indigo-300 focus:outline-none"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:ring focus:ring-indigo-300 focus:outline-none"
//           >
//             Se connecter
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;



