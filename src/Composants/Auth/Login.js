import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { auth, db } from '../../Config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import pour la navigation
import image1 from '../../Images/ImagesAdmin/logini.webp'
import logoSite from '../../Images/ImagesAdmin/1.png'


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      setError("Erreur : " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      {/* Vagues du haut et du bas */}
      <div className="absolute -top-8 -left-10 w-72 h-72 bg-light-blue rounded-full  rounded-tl-none mix-blend-multiply opacity-50 animate-pulse"></div>
      <div className="absolute -top-8 right-0 w-64 h-64 bg-royal-blue rounded-full  rounded-tr-none   mix-blend-multiply opacity-50 animate-pulse"></div>
      <div className="absolute bottom-8 left-10 w-72 h-72 bg-light-blue rounded-full mix-blend-multiply opacity-50 animate-pulse"></div>
      <div className="absolute bottom-1 right-20 w-64 h-64 bg-royal-blue rounded-full mix-blend-multiply opacity-50 animate-pulse"></div>

      <div className="relative w-10/12 max-w-2xl bg-white shadow-lg overflow-hidden rounded-lg">
        {/* Contenu principal divisé en deux */}
        <div className="flex flex-col-reverse lg:flex-row">
          {/* Section gauche avec illustration et waves */}
          <div className="relative w-full lg:w-1/2 bg-gradient-to-tr from-royal-blue to-light-blue flex items-center justify-center">
            {/* Waves */}
            <div className="absolute -top-8 -left-10 w-72 h-72 bg-light-blue rounded-full mix-blend-multiply opacity-50 animate-pulse"></div>
            <div className="absolute -top-10 -right-20 w-64 h-64 bg-royal-blue rounded-full mix-blend-multiply opacity-50 animate-pulse"></div>
            {/* Illustration */}
            <img
              src={image1}
              alt="Illustration de collaboration"
              className="w-3/4"
            />
          </div>

          {/* Section droite avec formulaire */}
          <div className="w-full lg:w-1/2 p-6 bg-white">
            <h2 className="text-2xl font-bold text-center text-royal-blue -mb-7">
              Bienvenue !
            </h2>
            <div className="flex justify-center -mb-7">
              <img
                src={logoSite}
                alt="Logo de notre site e-learning"
                className="w-1/2 lg:w-1/2"
              />
            </div>
            <form onSubmit={handleLogin} className="mt-4">
              {/* Champ Email */}
              <div className="mb-4 relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="📧 E-mail"
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-light-blue focus:border-light-blue"
                />
              </div>

              {/* Champ Mot de passe */}
              <div className="mb-4 relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="🔐Mot de passe"
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-light-blue focus:border-light-blue"
                />
              </div>
              <div className="mb-3 text-right">
                <a href="/reset-password" className="text-royal-blue  underline">
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
    </div>
  );
};

export default Login;


// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Récupérer le rôle de l'utilisateur dans Firestore
//       const userDoc = await getDoc(doc(db, "users", user.uid));
//       if (userDoc.exists()) {
//         const userData = userDoc.data();
//         const role = userData.role;

//         if (role === "admin") {
//           navigate("/admin/dashboard");
//         } else if (role === "coach") {
//           navigate("/coach/dashboard");
//         } else if (role === "etudiant") {
//           navigate("/etudiant/dashboard");
//         } else {
//           throw new Error("Rôle inconnu");
//         }
//       } else {
//         throw new Error("Utilisateur non trouvé dans Firestore");
//       }
//     } catch (err) {
//       setError("Erreur : " + err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-blue-100">
//       <div className="relative w-11/12 max-w-4xl bg-white shadow-lg overflow-hidden rounded-lg">
//         {/* Wave du haut */}
//         <div className="absolute -top-8 -left-10 w-96 h-96 bg-light-blue rounded-full mix-blend-multiply opacity-50 animate-pulse"></div>
//         <div className="absolute -top-10 -right-20 w-96 h-96 bg-royal-blue rounded-full mix-blend-multiply opacity-50 animate-pulse"></div>

//         {/* Contenu principal divisé en deux */}
//         <div className="flex flex-col-reverse lg:flex-row">
//           {/* Section gauche avec illustration */}
//           <div className="w-full lg:w-1/2 bg-gradient-to-tr from-royal-blue to-light-blue flex items-center justify-center">
//             <img
//               src={image1}
//               alt="Illustration de collaboration"
//               className="w-3/4"
//             />
//           </div>

//           {/* Section droite avec formulaire */}
//           <div className="w-full lg:w-1/2 p-8 bg-white relative z-10">
//             <h2 className="text-3xl font-bold text-center text-royal-blue">
//               Bienvenue !
//             </h2>
//             <div className="mt-4 flex justify-center">
//               <img
//                 src={logoSite}
//                 alt="Logo de notre site e-learning"
//                 className="w-1/2 lg:w-1/5"
//               />
//             </div>
//             <form onSubmit={handleLogin} className="mt-6">
//               <div className="mb-4">
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   E-mail
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   placeholder="E-mail"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-light-blue focus:border-light-blue"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Mot de passe
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   placeholder="Mot de passe"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-light-blue focus:border-light-blue"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="w-full px-4 py-2 text-white bg-royal-blue rounded-md hover:bg-light-blue focus:outline-none focus:ring focus:ring-light-blue"
//               >
//                 Se connecter
//               </button>
//             </form>
//             {/* Footer du formulaire */}
//             <div className="mt-4 text-center">
//               <p className="text-gray-600">
//                 <a href="/reset-password" className="text-royal-blue hover:underline">
//                   Mot de passe oublié
//                 </a>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Récupérer le rôle de l'utilisateur dans Firestore
//       const userDoc = await getDoc(doc(db, "users", user.uid));
//       if (userDoc.exists()) {
//         const userData = userDoc.data();
//         const role = userData.role;

//         if (role === "admin") {
//           navigate("/admin/dashboard");
//         } else if (role === "coach") {
//           navigate("/coach/dashboard");
//         } else if (role === "etudiant") {
//           navigate("/etudiant/dashboard");
//         } else {
//           throw new Error("Rôle inconnu");
//         }
//       } else {
//         throw new Error("Utilisateur non trouvé dans Firestore");
//       }
//     } catch (err) {
//       setError("Erreur : " + err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-blue-100">
//       <div className="relative w-11/12 max-w-4xl bg-white shadow-lg overflow-hidden rounded-lg">
//         {/* Wave du haut */}
//         <div className="absolute -top-8 -left-10 w-96 h-96 bg-light-blue rounded-full mix-blend-multiply opacity-50 animate-pulse"></div>
//         <div className="absolute -top-10 -right-20 w-96 h-96 bg-royal-blue rounded-full mix-blend-multiply opacity-50 animate-pulse"></div>

//         {/* Contenu principal divisé en deux */}
//         <div className="flex flex-col-reverse lg:flex-row">
//           {/* Section gauche avec illustration */}
//           <div className="w-full lg:w-1/2 bg-gradient-to-tr from-royal-blue to-light-blue flex items-center justify-center">
//             <img
//               src={image1}
//               alt="Illustration de collaboration"
//               className="w-3/4"
//             />
//           </div>

//           {/* Section droite avec formulaire */}
//           <div className="w-full lg:w-1/2 p-8 bg-white relative z-10">
//             <h2 className="text-3xl font-bold text-center text-royal-blue">
//               Bienvenue !
//             </h2>
//             <div className="mt-4 flex justify-center">
//               <img
//                 src={logoSite}
//                 alt="Logo de notre site e-learning"
//                 className="w-1/2 lg:w-1/5"
//               />
//             </div>
//             <form onSubmit={handleLogin} className="mt-6">
//               <div className="mb-4">
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   E-mail
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   placeholder="E-mail"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-light-blue focus:border-light-blue"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Mot de passe
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   placeholder="Mot de passe"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-light-blue focus:border-light-blue"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="w-full px-4 py-2 text-white bg-royal-blue rounded-md hover:bg-light-blue focus:outline-none focus:ring focus:ring-light-blue"
//               >
//                 Se connecter
//               </button>
//             </form>

//             {/* Footer du formulaire */}
//             <div className="mt-4 text-center">
//               <p className="text-gray-600">
//                 <a href="/reset-password" className="text-royal-blue hover:underline">
//                   Mot de passe oublié
//                 </a>
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Wave du bas */}
//         <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-light-blue rounded-full mix-blend-multiply opacity-50 animate-pulse"></div>
//         <div className="absolute -bottom-8 -right-20 w-96 h-96 bg-royal-blue rounded-full mix-blend-multiply opacity-50 animate-pulse"></div>
//       </div>
//     </div>
//   );
// };

// export default Login;








