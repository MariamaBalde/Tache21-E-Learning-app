import React, { useState } from 'react';
import { db, auth } from '../../Config/firebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

const InscrireUtilisateur = () => {
  const [email, setEmail] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [tel, setTel] = useState('');
  const [role, setRole] = useState('');
  const [domaine, setDomaine] = useState('');
  const [dureeFormation, setDureeFormation] = useState('');
  const [coachEmail, setCoachEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !nom || !prenom || !role) {
      setError('Veuillez remplir tous les champs obligatoires.');
      setLoading(false);
      return;
    }

    try {
      const password = Math.random().toString(36).slice(-8);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userRef = doc(collection(db, 'users'), user.uid);
      const userData = {
        email,
        nom,
        prenom,
        tel,
        role,
        domaine: role === 'etudiant' ? domaine : null,
        dureeFormation: role === 'etudiant' ? dureeFormation : null,
        coachEmail: role === 'etudiant' ? coachEmail : null,
        createdAt: new Date(),
        isActive: true,
      };
      await setDoc(userRef, userData);
      await sendPasswordResetEmail(auth, email);

      alert(`Utilisateur ${role} créé avec succès ! Un e-mail a été envoyé à ${email} pour définir un nouveau mot de passe.`);
      resetForm();
    } catch (error) {
      console.error('Erreur lors de la création de l’utilisateur:', error);
      setError("Erreur lors de l'inscription : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setNom('');
    setPrenom('');
    setTel('');
    setRole('');
    setDomaine('');
    setDureeFormation('');
    setCoachEmail('');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Inscrire un utilisateur</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-500">{error}</div>}
          <div>
            <label className="block text-gray-700">Nom</label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full border p-2 rounded-lg"
              placeholder="Nom complet"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Prénom</label>
            <input
              type="text"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className="w-full border p-2 rounded-lg"
              placeholder="Prénom"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded-lg"
              placeholder="Adresse email"
              required
            />
          </div>
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
          <div>
            <label className="block text-gray-700">Rôle</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border p-2 rounded-lg"
              required
            >
              <option value="">Choisir un rôle</option>
              <option value="etudiant">Étudiant</option>
              <option value="coach">Coach</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {role === 'etudiant' && (
            <>
              <div>
                <label className="block text-gray-700">Domaine</label>
                <select
                  value={domaine}
                  onChange={(e) => setDomaine(e.target.value)}
                  className="w-full border p-2 rounded-lg"
                  required
                >
                  <option value="">Choisir un domaine</option>
                  <option value="Développement Web">Développement Web</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Design et Management">Design et Management</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700">Durée de formation (en mois)</label>
                <input
                  type="number"
                  value={dureeFormation}
                  onChange={(e) => setDureeFormation(e.target.value)}
                  className="w-full border p-2 rounded-lg"
                  placeholder="Durée"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Email du coach</label>
                <input
                  type="email"
                  value={coachEmail}
                  onChange={(e) => setCoachEmail(e.target.value)}
                  className="w-full border p-2 rounded-lg"
                  placeholder="Email du coach"
                  required
                />
              </div>
            </>
          )}
          {role === 'coach' && (
            <div>
              <label className="block text-gray-700">Domaine d'expertise</label>
              <input
                type="text"
                value={domaine}
                onChange={(e) => setDomaine(e.target.value)}
                className="w-full border p-2 rounded-lg"
                placeholder="Domaine d'expertise"
                required
              />
            </div>
          )}
          <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700" disabled={loading}>
            {loading ? 'Chargement...' : 'Inscrire'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InscrireUtilisateur;





