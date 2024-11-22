import React, { useState, useEffect } from "react";

const Livraisons = () => {
  const [livraisons, setLivraisons] = useState([]);
  const [message, setMessage] = useState("");

  // Simuler une API qui récupère les livraisons des étudiants
  useEffect(() => {
    const fetchLivraisons = async () => {
      const data = [
        {
          id: 1,
          etudiant: "Jean Dupont",
          projet: "Site web React",
          lien: "http://github.com/projet1",
          status: "En attente",
        },
        {
          id: 2,
          etudiant: "Marie Curie",
          projet: "Application mobile",
          lien: "http://github.com/projet2",
          status: "En attente",
        },
      ];
      setLivraisons(data);
    };
    fetchLivraisons();
  }, []);

  const handleAccept = (id) => {
    setLivraisons((prev) =>
      prev.map((livraison) =>
        livraison.id === id ? { ...livraison, status: "Accepté" } : livraison
      )
    );
    setMessage("Livraison acceptée avec succès !");
  };

  const handleReject = (id) => {
    setLivraisons((prev) =>
      prev.map((livraison) =>
        livraison.id === id ? { ...livraison, status: "Rejeté" } : livraison
      )
    );
    setMessage("Livraison rejetée.");
  };

  return (
    <div>
      <h2>Liste des Livraisons</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}
      <ul>
        {livraisons.map((livraison) => (
          <li key={livraison.id} style={{ marginBottom: "20px" }}>
            <p>Étudiant : {livraison.etudiant}</p>
            <p>Projet : {livraison.projet}</p>
            <a href={livraison.lien} target="_blank" rel="noopener noreferrer">
              Lien de livraison
            </a>
            <p>Status : {livraison.status}</p>
            {livraison.status === "En attente" && (
              <div>
                <button onClick={() => handleAccept(livraison.id)}>Accepter</button>
                <button onClick={() => handleReject(livraison.id)}>Rejeter</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Livraisons;
