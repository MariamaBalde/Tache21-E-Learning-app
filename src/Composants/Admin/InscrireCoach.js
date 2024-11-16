import React, { useState } from 'react';
import { db } from '../../Config/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { sendEmailToStudent, sendEmailToCoach } from './sendEmail'; // Import des fonctions d'email

const InscrireEtudiant = () => {
  const [email, setEmail] = useState('');
  const [nom, setNom] = useState('');
  const [role, setRole] = useState('etudiant');
  const [coachEmail, setCoachEmail] = useState(''); // Nouveau champ pour l'email du coach
  const [domaine, setDomaine] = useState('');
  const [prenom, setPrenom] = useState('');
  const [tel, setTel] = useState('');
  const [dureeFormation, setDureeFormation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enregistrement de l'étudiant dans Firebase
      const userRef = collection(db, 'users');
      const docRef = await addDoc(userRef, {
        email,
        nom,
        prenom,
        role,
        domaine,
        tel,
        dureeFormation,
        coachEmail,
        createdAt: new Date(),
      });

      // Génération d'un mot de passe temporaire (par exemple)
      const password = Math.random().toString(36).slice(-8); // Un mot de passe simple de 8 caractères

      // Envoi des emails à l'étudiant et au coach
      await sendEmailToStudent(
        email,
        `${prenom} ${nom}`,
        coachEmail,
        domaine,
        dureeFormation,
        new Date(),
        password
      );
      await sendEmailToCoach(
        coachEmail,
        `${prenom} ${nom}`,
        domaine,
        dureeFormation,
        new Date()
      );

      alert('Etudiant inscrit avec succès et coach assigné !');
      setEmail('');
      setNom('');
      setPrenom('');
      setTel('');
      setCoachEmail('');
      setDomaine('');
      setDureeFormation('');
    } catch (error) {
      alert("Erreur lors de l'inscription : " + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Inscrire un étudiant
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Champ pour le prénom */}
          <div>
            <label className="block text-gray-700">Prénom</label>
            <input
              type="text"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className="w-full border p-2 rounded-lg"
              placeholder="Prénom"
            />
          </div>

          {/* Champ pour le nom */}
          <div>
            <label className="block text-gray-700">Nom</label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full border p-2 rounded-lg"
              placeholder="Nom complet"
            />
          </div>

          {/* Champ pour l'email */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded-lg"
              placeholder="Adresse email"
            />
          </div>

          {/* Champ pour le téléphone */}
          <div>
            <label className="block text-gray-700">Téléphone</label>
            <input
              type="tel"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              className="w-full border p-2 rounded-lg"
              placeholder="Numéro de téléphone"
            />
          </div>

          {/* Choix du domaine */}
          <div>
            <label className="block text-gray-700">Domaine</label>
            <select
              value={domaine}
              onChange={(e) => setDomaine(e.target.value)}
              className="w-full border p-2 rounded-lg"
            >
              <option value="">Sélectionner un domaine</option>
              <option value="Developpeur Web">Développeur Web</option>
              <option value="Designer">Designer</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          {/* Durée de la formation */}
          <div>
            <label className="block text-gray-700">
              Durée de la formation (en mois)
            </label>
            <input
              type="number"
              value={dureeFormation}
              onChange={(e) => setDureeFormation(e.target.value)}
              className="w-full border p-2 rounded-lg"
              placeholder="Durée en mois"
            />
          </div>

          {/* Email du coach */}
          <div>
            <label className="block text-gray-700">Email du Coach</label>
            <input
              type="email"
              value={coachEmail}
              onChange={(e) => setCoachEmail(e.target.value)}
              className="w-full border p-2 rounded-lg"
              placeholder="Email du coach"
            />
          </div>

          <button className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700">
            Inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default InscrireEtudiant;
