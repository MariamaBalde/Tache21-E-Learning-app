import React, { useState, useEffect } from "react";
import GradientCard from "./GradientCard";
import { ClipboardCheck, ClipboardList, Layers, Trash2 } from "lucide-react"; // Icônes
import Loader from "../Shared/Loader"; // Chemin corrigé pour Loader
import { toast } from "react-toastify"; // Importer Toastify

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true); // État pour gérer le chargement

  useEffect(() => {
    // Simuler un appel API ou un processus de chargement
    const loadData = async () => {
      setIsLoading(true);
      // Simuler une attente de 2 secondes
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    };

    loadData();
  }, []);

  const handleDelete = () => {
    toast.success("Action Supprimer déclenchée !"); // Afficher une notification de succès avec Toastify
  };

  return (
    <main className="p-6">
      {/* Affichage du Loader pendant le chargement */}
      {isLoading ? (
        <Loader /> // Afficher le Loader pendant que les données se chargent
      ) : (
        <>
          {/* Titre principal */}
          <h2 className="text-xl text-sky-950 font-bold mb-4">Word Sets</h2>

          {/* Cartes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* Carte Tâches */}
            <GradientCard
              title="Tâches"
              icon={ClipboardList} // Icône pour les tâches
              gradient="bg-gradient-to-br from-blue-600 to-blue-300"
            />
            {/* Carte Tâches Validées */}
            <GradientCard
              title="Tâches Validées"
              icon={ClipboardCheck} // Icône pour les tâches validées
              gradient="bg-gradient-to-br from-blue-300 to-[#FF66FF]"
            />
            {/* Carte Programmes */}
            <GradientCard
              title="Programmes"
              icon={Layers} // Icône pour les programmes
              gradient="bg-gradient-to-br from-blue-200 to-blue-800"
            />
          </div>

          {/* Barre de recherche et date */}
          <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md">
            {/* Input de recherche */}
            <div className="flex items-center w-full sm:w-auto mb-4 sm:mb-0">
              <input
                type="text"
                placeholder="Rechercher..."
                className="p-2 border border-gray-300 rounded-lg w-full sm:w-64"
              />
            </div>

            {/* Affichage de la date */}
            <div className="flex items-center space-x-2">
              <label className="text-gray-700 font-semibold">Date :</label>
              <input
                type="date"
                className="p-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Icône Supprimer */}
            <button
              className="flex items-center space-x-2 text-red-500 hover:text-red-700 ml-4"
              onClick={handleDelete}
            >
              <Trash2 className="w-5 h-5" />
              <span>Supprimer</span>
            </button>
          </div>
        </>
      )}
    </main>
  );
};

export default Dashboard;




// import React, { useState, useEffect } from "react";
// import GradientCard from "./GradientCard";
// import { ClipboardCheck, ClipboardList, Layers, Trash2 } from "lucide-react"; // Icônes
// import Loader from "../Shared/Loader"; // Chemin corrigé pour Loader

// const Dashboard = () => {
//   const [isLoading, setIsLoading] = useState(true); // État pour gérer le chargement

//   useEffect(() => {
//     // Simuler un appel API ou un processus de chargement
//     const loadData = async () => {
//       setIsLoading(true);
//       // Simuler une attente de 2 secondes
//       setTimeout(() => {
//         setIsLoading(false);
//       }, 300);
//     };

//     loadData();
//   }, []);

//   return (
//     <main className="p-6">
//       {/* Affichage du Loader pendant le chargement */}
//       {isLoading ? (
//         <Loader /> // Afficher le Loader pendant que les données se chargent
//       ) : (
//         <>
//           {/* Titre principal */}
//           <h2 className="text-xl text-sky-950 font-bold mb-4">Word Sets</h2>

//           {/* Cartes */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//             {/* Carte Tâches */}
//             <GradientCard
//               title="Tâches"
//               icon={ClipboardList} // Icône pour les tâches
//               gradient="bg-gradient-to-br from-blue-600 to-blue-300"
//             />
//             {/* Carte Tâches Validées */}
//             <GradientCard
//               title="Tâches Validées"
//               icon={ClipboardCheck} // Icône pour les tâches validées
//               gradient="bg-gradient-to-br from-blue-300 to-[#FF66FF]"
//             />
//             {/* Carte Programmes */}
//             <GradientCard
//               title="Programmes"
//               icon={Layers} // Icône pour les programmes
//               gradient="bg-gradient-to-br from-blue-200 to-blue-800"
//             />
//           </div>

//           {/* Barre de recherche et date */}
//           <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md">
//             {/* Input de recherche */}
//             <div className="flex items-center w-full sm:w-auto mb-4 sm:mb-0">
//               <input
//                 type="text"
//                 placeholder="Rechercher..."
//                 className="p-2 border border-gray-300 rounded-lg w-full sm:w-64"
//               />
//             </div>

//             {/* Affichage de la date */}
//             <div className="flex items-center space-x-2">
//               <label className="text-gray-700 font-semibold">Date :</label>
//               <input
//                 type="date"
//                 className="p-2 border border-gray-300 rounded-lg"
//               />
//             </div>

//             {/* Icône Supprimer */}
//             <button
//               className="flex items-center space-x-2 text-red-500 hover:text-red-700 ml-4"
//               onClick={() => alert("Action Supprimer déclenchée !")}
//             >
//               <Trash2 className="w-5 h-5" />
//               <span>Supprimer</span>
//             </button>
//           </div>
//         </>
//       )}
//     </main>
//   );
// };

// export default Dashboard;
