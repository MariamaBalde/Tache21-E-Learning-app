import React, { useState } from "react";
import Profil from "./Profil"; // Importer le composant Profil

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "Jean",
    lastName: "Dupont",
    password: "",
    image: "https://via.placeholder.com/40", // Par défaut, une image placeholder
  });

  return (
    <div>
      {/* Navbar */}
      <div className="bg-white shadow-md flex items-center justify-between px-6 py-3 relative">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-800">E-Learning</div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Rechercher..."
          className="flex-grow mx-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Icons */}
        <div className="flex items-center space-x-4 relative">
          <i className="cursor-pointer text-gray-600 hover:text-blue-600">🔔</i>
          <i className="cursor-pointer text-gray-600 hover:text-blue-600">✉</i>
          {/* Photo de profil */}
          <img
            src={profile.image} // Utilisation de l'image actuelle du profil
            alt="Photo de profil"
            className="w-10 h-10 rounded-full cursor-pointer hover:ring-2 hover:ring-blue-600"
            onClick={() => setIsModalOpen(!isModalOpen)}
          />

          {/* Composant Profil */}
          <Profil
            profile={profile}
            setProfile={setProfile}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;




// import React, { useState } from "react";
// import Profil from "./Profil"; // Importer le composant Profil

// function Navbar() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [profile, setProfile] = useState({
//     firstName: "Jean",
//     lastName: "Dupont",
//     password: "",
//   });

//   return (
//     <div>
//       {/* Navbar */}
//       <div className="bg-white shadow-md flex items-center justify-between px-6 py-3 relative">
//         {/* Logo */}
//         <div className="text-xl font-bold text-gray-800">E-Learning</div>

//         {/* Search Bar */}
//         <input
//           type="text"
//           placeholder="Rechercher..."
//           className="flex-grow mx-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         {/* Icons */}
//         <div className="flex items-center space-x-4 relative">
//           <i className="cursor-pointer text-gray-600 hover:text-blue-600">🔔</i>
//           <i className="cursor-pointer text-gray-600 hover:text-blue-600">✉</i>
//           {/* Photo de profil */}
//           <img
//             src="https://via.placeholder.com/40"
//             alt="Photo de profil"
//             className="w-10 h-10 rounded-full cursor-pointer hover:ring-2 hover:ring-blue-600"
//             onClick={() => setIsModalOpen(!isModalOpen)} 
//           />

//           {/* Composant Profil */}
//           <Profil
//             profile={profile}
//             setProfile={setProfile}
//             isModalOpen={isModalOpen}
//             setIsModalOpen={setIsModalOpen}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;
