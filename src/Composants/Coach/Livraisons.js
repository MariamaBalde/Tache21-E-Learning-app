import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
const Livraisons = () => {
  const livraisons = [
    {
      etudiant: 'Mohamed fall',
      projet: 'Site web React',
      lien: '#',
      statut: 'En attente',
    },
    {
      etudiant: 'Marie Cisse',
      projet: 'Application mobile',
      lien: '#',
      statut: 'En attente',
    },
  ];

  const [reactions, setReactions] = useState({});

  const handleAction = (index, action) => {
    setReactions((prev) => ({
      ...prev,
      [index]: action,
    }));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Liste des livraisons</h1>
      <div className="space-y-4">
        {livraisons.map((livraison, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition"
          >
            <p className="text-lg font-semibold text-gray-700">
              Étudiant : <span className="text-gray-900">{livraison.etudiant}</span>
            </p>
            <p className="text-lg text-gray-600">
              Projet : <span className="text-gray-800">{livraison.projet}</span>
            </p>
            <p className="text-sm text-blue-600 hover:underline">
              <a href={livraison.lien} target="_blank" rel="noopener noreferrer">
                Lien de livraison
              </a>
            </p>
            <div className="mt-2 flex items-center gap-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${livraison.statut === 'En attente'
                    ? 'bg-blue-500 text-white'
                    : 'bg-green-100 text-green-700'
                  }`}
              >
                Statut : {livraison.statut}
              </span>
              <button
                className="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                onClick={() => handleAction(index, 'validé')}
              >
                Accepter
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                onClick={() => handleAction(index, 'rejeté')}
              >
                Rejeter
              </button>
            </div>
            {reactions[index] && (
              <div className="mt-4 flex items-center gap-2">
                {reactions[index] === 'validé' ? (
                  <FaCheckCircle className="text-green-500 text-xl" />
                ) : (
                  <FaTimesCircle className="text-red-500 text-xl" />
                )}
                <span
                  className={`text-lg font-semibold ${reactions[index] === 'validé' ? 'text-green-700' : 'text-red-700'
                    }`}
                >
                  {reactions[index] === 'validé' ? 'Validé' : 'Rejeté'}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Livraisons;

// import React, { useEffect, useState } from "react";
// import { db } from "../../Config/firebaseConfig";
// import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

// const Livraisons = () => {
//   const [deliveries, setDeliveries] = useState([]);

//   const fetchDeliveries = async () => {
//     const querySnapshot = await getDocs(collection(db, "livraisons"));
//     setDeliveries(
//       querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
//     );
//   };

//   const handleStatusChange = async (id, status) => {
//     const deliveryRef = doc(db, "livraisons", id);
//     await updateDoc(deliveryRef, { status });
//     fetchDeliveries();
//   };

//   useEffect(() => {
//     fetchDeliveries();
//   }, []);

//   return (
//     <div>
//       <h2>Livraisons des étudiants</h2>
//       {deliveries.map((delivery) => (
//         <div key={delivery.id}>
//           <p>Étudiant: {delivery.studentId}</p>
//           <p>Statut: {delivery.status}</p>
//           <p>Liens: {delivery.links.join(", ")}</p>
//           <button onClick={() => handleStatusChange(delivery.id, "accepté")}>
//             Accepter
//           </button>
//           <button onClick={() => handleStatusChange(delivery.id, "rejeté")}>
//             Rejeter
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Livraisons;
