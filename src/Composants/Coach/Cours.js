import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../../Config/firebaseConfig';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';
import { FaEdit, FaTrash, FaLink } from 'react-icons/fa';

const Cours = () => {
  const { sousDomaineId } = useParams();

  const [cours, setCours] = useState([]);
  const [newCours, setNewCours] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editCoursId, setEditCoursId] = useState(null);

  const fetchCours = async () => {
    try {
      const coursRef = collection(db, 'cours');
      const q = query(coursRef, where('sousDomaineId', '==', sousDomaineId));
      const querySnapshot = await getDocs(q);
      const coursData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCours(coursData);
    } catch (error) {
      console.error('Erreur lors de la récupération des cours :', error);
    }
  };

  useEffect(() => {
    fetchCours();
  }, [sousDomaineId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const coursRef = collection(db, 'cours');
      if (editCoursId) {
        const coursDoc = doc(coursRef, editCoursId);
        await updateDoc(coursDoc, { name: newCours, description, link });
        alert('Cours modifié avec succès !');
      } else {
        await addDoc(coursRef, {
          name: newCours,
          description,
          link,
          sousDomaineId,
        });
        alert('Cours ajouté avec succès !');
      }
      setNewCours('');
      setDescription('');
      setLink('');
      fetchCours();
      setShowAddModal(false);
      setEditCoursId(null);
    } catch (error) {
      console.error(
        'Erreur lors de la création ou modification du cours :',
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const handleArchive = async (coursId) => {
    try {
      const coursRef = doc(db, 'cours', coursId);
      await updateDoc(coursRef, { archived: true });
      fetchCours();
      alert('Cours archivé avec succès !');
    } catch (error) {
      console.error("Erreur lors de l'archivage du cours :", error);
    }
  };

  const handleEdit = (coursId) => {
    const coursToEdit = cours.find((c) => c.id === coursId);
    if (coursToEdit) {
      setNewCours(coursToEdit.name);
      setDescription(coursToEdit.description || '');
      setLink(coursToEdit.link || '');
      setEditCoursId(coursId);
      setShowAddModal(true);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Cours du sous-domaine</h1>

      <button
        onClick={() => setShowAddModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2 mb-6"
      >
        Ajouter un cours
      </button>

      <ul className="list-disc pl-5">
        {cours.map((coursItem) => (
          <li
            key={coursItem.id}
            className="flex justify-between items-center mb-4"
          >
            <div>
              <h3 className="text-lg font-semibold">{coursItem.name}</h3>
              <p className="text-sm text-gray-600">{coursItem.description}</p>
              {coursItem.link && (
                <a
                  href={coursItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Voir le contenu
                </a>
              )}
            </div>
            <div className="flex space-x-2">
              <button onClick={() => handleEdit(coursItem.id)}>
                <FaEdit className="text-yellow-500" />
              </button>
              <button onClick={() => handleArchive(coursItem.id)}>
                <FaTrash className="text-red-500" />
              </button>
              {coursItem.link && (
                <a
                  href={coursItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLink className="text-blue-500" />
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              {editCoursId ? 'Modifier le cours' : 'Ajouter un cours'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={newCours}
                onChange={(e) => setNewCours(e.target.value)}
                placeholder="Nom du cours"
                required
                className="border rounded px-3 py-2 w-full"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="border rounded px-3 py-2 w-full"
              />
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Lien (YouTube, OpenClassrooms, etc.)"
                className="border rounded px-3 py-2 w-full"
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                  {loading ? 'Ajout...' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cours;
