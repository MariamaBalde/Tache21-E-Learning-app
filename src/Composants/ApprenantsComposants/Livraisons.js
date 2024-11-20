// src/Composants/ApprenantsComposants/Livraisons.js
import React from 'react';

const Livraisons = () => {
  const deliveries = [
    { id: 1, title: "Livraison du colis #1234", status: "En attente" },
    { id: 2, title: "Livraison du colis #5678", status: "Expédiée" },
  ];

  return (
    <div className="space-y-6">
      {deliveries.map((delivery) => (
        <div key={delivery.id} className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-medium">{delivery.title}</h3>
          <p className={`mt-2 ${delivery.status === 'En attente' ? 'text-yellow-600' : 'text-green-600'}`}>{delivery.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Livraisons;
