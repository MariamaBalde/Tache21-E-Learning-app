
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../Config/firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { FaTrashAlt, FaEdit, FaPlus } from 'react-icons/fa'; // Import des icônes

const Domains = () => {
  const [domains, setDomains] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchDomains = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'domaines'));
      const domainsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDomains(domainsData);
    } catch (error) {
      console.error('Erreur lors de la récupération des domaines :', error);
    }
  };

  useEffect(() => {
    fetchDomains();
  }, []);

  return (
    <div className="p-6">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          try {
            await addDoc(collection(db, 'domaines'), { name });
            alert('Domaine ajouté !');
            setName('');
            fetchDomains();
          } catch (error) {
            console.error('Erreur lors de la création :', error);
          } finally {
            setLoading(false);
          }
        }}
        className="mb-6 flex items-center space-x-4"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom du domaine"
          required
          className="border rounded px-3 py-2 w-full md:w-1/2"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300 flex items-center space-x-2"
        >
          <FaPlus />
          <span>{loading ? 'Ajout...' : 'Ajouter'}</span>
        </button>
      </form>


      {/* Liste des cartes de domaines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {domains.map((domain) => (
          <div
            key={domain.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4"
          >
            <div className="flex items-center justify-between">
              <Link
                to={`/coach/dashboard/domains/${domain.id}`}
                className="text-lg font-semibold text-blue-600 hover:text-blue-800"
              >
                {domain.name}
              </Link>
              {/* Icône modifier */}
              <Link
                to={`/coach/dashboard/domains/edit/${domain.id}`}
                className="text-yellow-500 hover:text-yellow-700"
              >
                <FaEdit />
              </Link>
            </div>

            <div className="flex justify-end mt-4">
              {/* Icône supprimer */}
              <button
                onClick={async () => {
                  if (window.confirm('Confirmer la suppression ?')) {
                    try {
                      await deleteDoc(doc(db, 'domaines', domain.id));
                      fetchDomains();
                    } catch (error) {
                      console.error('Erreur lors de la suppression :', error);
                    }
                  }
                }}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Domains;
