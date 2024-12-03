import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../Config/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';
import {
  FaArchive,
  FaEdit,
  FaUsers,
  FaPlus,
  FaUndo,
  FaTrash,
} from 'react-icons/fa';

const Domains = () => {
  const [domains, setDomains] = useState([]);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState(null); // Domaine sélectionné
  const [searchTerm, setSearchTerm] = useState('');
  const [searchError, setSearchError] = useState(false);
  const [studentsInDomain, setStudentsInDomain] = useState([]);
  const [showStudentsList, setShowStudentsList] = useState(false);
  const [showAddDomainModal, setShowAddDomainModal] = useState(false); // Modal pour ajouter des domaines
  const [newDomainName, setNewDomainName] = useState(''); // Nom du nouveau domaine
  const [showEditDomainModal, setShowEditDomainModal] = useState(false); // Modal pour éditer le domaine
  const [domainToEdit, setDomainToEdit] = useState(null); // Domaine à éditer
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // L'utilisateur est connecté, récupérez ses informations
        setCurrentUser(user);
      } else {
        // L'utilisateur n'est pas connecté
        setCurrentUser(null);
      }
    });

    // Nettoyage de l'écouteur lors du démontage du composant
    return () => unsubscribe();
  }, []);

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

  const fetchStudents = async () => {
    try {
      const studentsQuery = query(
        collection(db, 'users'),
        where('role', '==', 'etudiant')
      );
      const querySnapshot = await getDocs(studentsQuery);
      const studentsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(studentsData);
      setFilteredStudents(studentsData);
    } catch (error) {
      console.error('Erreur lors de la récupération des étudiants :', error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);

    if (term.trim() === '') {
      setFilteredStudents(students);
      setSearchError(false);
      return;
    }

    const filtered = students.filter((student) => {
      const studentName = student.nom ? student.nom.toLowerCase() : '';
      const studentSurname = student.prenom ? student.prenom.toLowerCase() : '';
      const studentEmail = student.email ? student.email.toLowerCase() : '';
      return (
        studentName.includes(term.toLowerCase()) ||
        studentSurname.includes(term.toLowerCase()) ||
        studentEmail.includes(term.toLowerCase())
      );
    });

    setFilteredStudents(filtered);
    setSearchError(filtered.length === 0);
  };

  const assignStudentToDomain = async (studentId) => {
    if (!selectedDomain) {
      alert('Veuillez sélectionner un domaine avant d’assigner un étudiant.');
      return;
    }

    try {
      await updateDoc(doc(db, 'users', studentId), {
        domaineId: selectedDomain,
      });
      alert('Étudiant assigné au domaine avec succès !');
      fetchStudents();
      setSearchTerm('');
      setFilteredStudents(students);
      setShowModal(false);
    } catch (error) {
      console.error("Erreur lors de l'assignation de l'étudiant :", error);
    }
  };

  const archiveDomain = async (domainId) => {
    try {
      await updateDoc(doc(db, 'domaines', domainId), {
        archived: true, // Ajouter un champ "archived" pour marquer le domaine comme archivé
      });
      alert(`Domaine ${domainId} archivé avec succès.`);
      fetchDomains(); // Actualiser la liste des domaines
    } catch (error) {
      console.error("Erreur lors de l'archivage du domaine :", error);
    }
  };

  const editDomain = (domain) => {
    // Ouvre le modal de modification du domaine
    setDomainToEdit(domain);
    setShowEditDomainModal(true);
  };

  const handleEditDomainSubmit = async (e) => {
    e.preventDefault();

    if (!domainToEdit.name.trim()) {
      alert('Le nom du domaine est obligatoire.');
      return;
    }

    try {
      await updateDoc(doc(db, 'domaines', domainToEdit.id), {
        name: domainToEdit.name.trim(),
      });
      alert('Domaine modifié avec succès.');
      setShowEditDomainModal(false);
      fetchDomains(); // Actualiser la liste des domaines
    } catch (error) {
      console.error('Erreur lors de la modification du domaine :', error);
    }
  };

  const showStudentsInDomain = (domainId) => {
    const studentsInThisDomain = students.filter(
      (student) => student.domaineId === domainId
    );
    setStudentsInDomain(studentsInThisDomain);
    setShowStudentsList(true);
  };

  const handleAddDomain = async () => {
    if (!newDomainName.trim()) {
      alert('Le nom du domaine est obligatoire.');
      return;
    }

    try {
      await addDoc(collection(db, 'domaines'), {
        name: newDomainName.trim(),
        createdAt: new Date(),
      });
      alert('Domaine ajouté avec succès !');
      setShowAddDomainModal(false);
      setNewDomainName('');
      fetchDomains(); // Refresh domains list
    } catch (error) {
      console.error('Erreur lors de l’ajout du domaine :', error);
    }
  };

  useEffect(() => {
    fetchDomains();
    fetchStudents();
  }, []);

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Gestion des Domaines
      </h1>

      {/* Bouton Ajouter un Domaine */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowAddDomainModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Ajouter un Domaine
        </button>
      </div>

      {/* Domaines List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {domains.map((domain) => {
          const studentCount = students.filter(
            (student) => student.domaineId === domain.id
          ).length;

          return (
            <div
              key={domain.id}
              className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 h-64 flex flex-col justify-between border border-gray-200 ${
                domain.archived ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              title={domain.archived ? 'Domaine archivé' : ''}
            >
              <div>
                <Link
                  to={`/coach/dashboard/domains/${domain.id}`}
                  className="text-xl font-semibold text-blue-600 hover:text-blue-800"
                >
                  {domain.name}
                </Link>
              </div>
              <div className="flex justify-between items-center mt-4 space-x-4">
                {/* Boutons pour éditer ou archiver un domaine */}
                <button
                  onClick={() => editDomain(domain)} // Ouvre le formulaire de modification
                  className={`text-yellow-500 hover:text-yellow-700 text-xl ${
                    domain.archived ? 'disabled' : ''
                  }`}
                  disabled={domain.archived}
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => archiveDomain(domain.id)}
                  className={`text-red-500 hover:text-red-700 text-xl ${
                    domain.archived ? 'disabled' : ''
                  }`}
                  disabled={domain.archived}
                >
                  <FaArchive />
                </button>

                <button
                  onClick={() => showStudentsInDomain(domain.id)}
                  className={`relative text-gray-500 hover:text-gray-700 text-xl ${
                    domain.archived ? 'disabled' : ''
                  }`}
                  disabled={domain.archived}
                >
                  <FaUsers />
                  <span
                    className={`absolute top-0 left-0 text-xs font-bold ${
                      studentCount === 0 ? 'text-gray-500' : 'text-red-500'
                    }`}
                    style={{ transform: 'translate(-50%, -50%)' }}
                  >
                    {studentCount === 0 ? '0' : studentCount}
                  </span>
                </button>
                <button
                  onClick={() => {
                    setSelectedDomain(domain.id); // Sélectionner le domaine
                    setShowModal(true);
                  }}
                  className={`text-green-500 hover:text-green-700 text-xl ${
                    domain.archived ? 'disabled' : ''
                  }`}
                  disabled={domain.archived}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for Editing Domain */}
      {showEditDomainModal && domainToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Modifier le Domaine</h2>
            <form onSubmit={handleEditDomainSubmit}>
              <input
                type="text"
                value={domainToEdit.name}
                onChange={(e) =>
                  setDomainToEdit({ ...domainToEdit, name: e.target.value })
                }
                className="border rounded w-full px-4 py-2 mb-4"
                placeholder="Nom du domaine"
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Sauvegarder
                </button>
                <button
                  onClick={() => setShowEditDomainModal(false)}
                  className="text-red-500 hover:text-red-700"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Adding Student to Domain */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Ajouter un Étudiant</h2>
            <input
              type="text"
              placeholder="Rechercher un étudiant"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="border rounded w-full px-4 py-2 mb-4"
            />
            {searchError && (
              <div className="text-red-500 text-sm mb-4">
                Aucun étudiant trouvé
              </div>
            )}
            <ul>
              {filteredStudents.map((student) => (
                <li
                  key={student.id}
                  className="flex justify-between items-center mb-2"
                >
                  <span>
                    {student.nom} {student.prenom}
                  </span>
                  <button
                    onClick={() => assignStudentToDomain(student.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    disabled={student.domaineId === selectedDomain} // Désactive le bouton si l'étudiant est déjà assigné au domaine
                  >
                    {student.domaineId === selectedDomain
                      ? 'Déjà assigné'
                      : 'Ajouter'}
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 text-red-500 hover:text-red-700"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Modal for Adding a New Domain */}
      {showAddDomainModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">
              Ajouter un Nouveau Domaine
            </h2>
            <input
              type="text"
              placeholder="Nom du Domaine"
              value={newDomainName}
              onChange={(e) => setNewDomainName(e.target.value)}
              className="border rounded w-full px-4 py-2 mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={handleAddDomain}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Ajouter
              </button>
              <button
                onClick={() => setShowAddDomainModal(false)}
                className="text-red-500 hover:text-red-700"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Viewing Students in Domain */}
      {showStudentsList && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Étudiants du Domaine</h2>
            {/* Afficher les étudiants ou un message s'il n'y en a aucun */}
            {studentsInDomain.length === 0 ? (
              <p>Aucun étudiant assigné pour ce domaine</p>
            ) : (
              <ul>
                {studentsInDomain.map((student) => (
                  <li key={student.id}>
                    {student.nom} {student.prenom}
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => setShowStudentsList(false)}
              className="text-red-500 hover:text-red-700 mt-4"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Domains;
