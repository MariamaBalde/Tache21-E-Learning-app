import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../../Config/firebaseConfig';
import {
  collection,
  getDocs,
  doc,
  addDoc,
  deleteDoc,
  query,
  getDoc,
  where,
} from 'firebase/firestore';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';

const SousDomaines = () => {
  const { domaineId, sousDomaineId } = useParams();

  const [sousDomaines, setSousDomaines] = useState([]);
  const [newSousDomaine, setNewSousDomaine] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [domaineName, setDomaineName] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSousDomaine, setSelectedSousDomaine] = useState(null);

  const fetchDomaineName = async () => {
    try {
      const domaineRef = doc(db, 'domaines', domaineId);
      const domaineSnapshot = await getDoc(domaineRef);
      if (domaineSnapshot.exists()) {
        setDomaineName(domaineSnapshot.data().name);
      } else {
        console.error('Domaine non trouvé');
      }
    } catch (error) {
      console.error(
        'Erreur lors de la récupération du nom du domaine :',
        error
      );
    }
  };

  const fetchSousDomaines = async () => {
    try {
      const sousDomainesRef = collection(db, 'sous-domaines');
      const q = query(sousDomainesRef, where('domaineId', '==', domaineId));
      const querySnapshot = await getDocs(q);
      const sousDomainesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSousDomaines(sousDomainesData);
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des sous-domaines :',
        error
      );
    }
  };

  useEffect(() => {
    fetchDomaineName();
    fetchSousDomaines();
  }, [domaineId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const sousDomainesRef = collection(db, 'sous-domaines');
      await addDoc(sousDomainesRef, {
        name: newSousDomaine,
        domaineId,
        domaineName,
        imageURL:
          imageURL ||
          'https://raw.githubusercontent.com/username/repository-name/main/images/default-image.jpg',
      });
      alert('Sous-domaine ajouté avec succès !');
      setNewSousDomaine('');
      setImageURL('');
      fetchSousDomaines();
      setShowAddModal(false);
    } catch (error) {
      console.error('Erreur lors de la création :', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const sousDomaineRef = doc(db, 'sous-domaines', selectedSousDomaine);
      await deleteDoc(sousDomaineRef);
      alert('Sous-domaine supprimé !');
      fetchSousDomaines();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
    }
  };

  return (
    <div className="p-6 toto">
      <h1 className="text-2xl font-semibold mb-6">
        Sous-domaines pour le domaine : {domaineName || 'Chargement...'}
      </h1>

      <button
        onClick={() => setShowAddModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2 mb-6"
      >
        <FaPlus />
        <span>Ajouter un sous-domaine</span>
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sousDomaines.map((sousDomaine) => (
          <div
            key={sousDomaine.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4"
          >
            <Link
              to={`/coach/dashboard/domains/${domaineId}/sous-domaines/${sousDomaine.id}/cours`}
              className="text-lg font-semibold text-blue-600"
            >
              {sousDomaine.name}
            </Link>
            <img
              src={sousDomaine.imageURL || '/default-image.jpg'}
              alt={sousDomaine.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <button
              onClick={() => {
                setSelectedSousDomaine(sousDomaine.id);
                setShowDeleteModal(true);
              }}
              className="text-red-500 hover:underline flex items-center space-x-2"
            >
              <FaTrashAlt />
              <span>Supprimer</span>
            </button>
          </div>
        ))}
      </div>

      {/* Modal d'ajout */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              Ajouter un sous-domaine
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={newSousDomaine}
                onChange={(e) => setNewSousDomaine(e.target.value)}
                placeholder="Nom du sous-domaine"
                required
                className="border rounded px-3 py-2 w-full"
              />
              <input
                type="text"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
                placeholder="URL de l'image (GitHub)"
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

      {/* Modal de suppression */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">
              Supprimer ce sous-domaine ?
            </h2>
            <p className="mb-4">
              Cette action est irréversible. Êtes-vous sûr de vouloir continuer
              ?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SousDomaines;