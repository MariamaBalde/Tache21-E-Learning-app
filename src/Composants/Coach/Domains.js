import React from "react";

function Domains() {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Domaines</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6">
                Créer un Domaine
            </button>
            <ul className="space-y-4">
                <li className="bg-gray-100 p-4 rounded shadow flex justify-between items-center">
                    <span>Domaine 1</span>
                    <div className="space-x-2">
                        <button className="text-blue-600 hover:underline">Voir</button>
                        <button className="text-green-600 hover:underline">Modifier</button>
                        <button className="text-red-600 hover:underline">Archiver</button>
                    </div>
                </li>
                <li className="bg-gray-100 p-4 rounded shadow flex justify-between items-center">
                    <span>Domaine 2</span>
                    <div className="space-x-2">
                        <button className="text-blue-600 hover:underline">Voir</button>
                        <button className="text-green-600 hover:underline">Modifier</button>
                        <button className="text-red-600 hover:underline">Archiver</button>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Domains;

