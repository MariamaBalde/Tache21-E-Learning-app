
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
} from 'firebase/firestore';
import { FaArchive, FaEdit, FaUsers, FaPlus } from 'react-icons/fa';

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
          title="Ajouter un Nouveau Domaine" // Ajout du nom de l'action
        >
          Ajouter 
        </button>
      </div>

      {/* Domaines List */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {domains.map((domain) => {
          const studentCount = students.filter(
            (student) => student.domaineId === domain.id
          ).length;

          return (
            <div
              key={domain.id}
              className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6  flex flex-col justify-between border border-blue-600 ${
                domain.archived ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              title={domain.archived ? 'Domaine archivé' : ''}
            >
              <div>
                <Link
                  to={`/coach/dashboard/domains/${domain.id}`}
                  className="font-bold text-xl text-blue-600 hover:text-blue-800"
                  title="Voir " // Ajout du nom de l'action
                >
                  {domain.name}
                </Link>
              </div>
              <div className="flex justify-between items-center mt-4 space-x-4">
                {/* Boutons pour éditer ou archiver un domaine */}
                <button
                  onClick={() => editDomain(domain)} // Ouvre le formulaire de modification
                  className={`text-yellow-500 hover:text-yellow-700 text-xl ${domain.archived ? 'disabled' : ''}`}
                  disabled={domain.archived}
                  title="Modifier" // Ajout du nom de l'action
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => archiveDomain(domain.id)}
                  className={`text-red-500 hover:text-red-700 text-xl ${domain.archived ? 'disabled' : ''}`}
                  disabled={domain.archived}
                  title="Archiver" // Ajout du nom de l'action
                >
                  <FaArchive />
                </button>

                <button
                  onClick={() => showStudentsInDomain(domain.id)}
                  className={`relative text-gray-500 hover:text-gray-700 text-xl ${domain.archived ? 'disabled' : ''}`}
                  disabled={domain.archived}
                  title="Voir " // Ajout du nom de l'action
                >
                  <FaUsers />
                  <span
                    className={`absolute top-0 left-0 text-xs font-bold ${studentCount === 0 ? 'text-gray-500' : 'text-red-500'}`}
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
                  className={`text-green-500 hover:text-green-700 text-xl ${domain.archived ? 'disabled' : ''}`}
                  disabled={domain.archived}
                  title="Ajouter " // Ajout du nom de l'action
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal pour ajouter un étudiant */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold text-center mb-4 bg-black text-white">Ajouter </h3>
            <div className="mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                placeholder="Rechercher un étudiant..."
              />
              {searchError && (
                <p className="text-red-500 text-sm mt-2">
                  Aucun étudiant trouvé avec ce nom.
                </p>
              )}
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filteredStudents.map((student) => (
                <div key={student.id} className="flex justify-between items-center">
                  <span>{student.nom} {student.prenom}</span>
                  <button
                    onClick={() => assignStudentToDomain(student.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    title="Assigner cet étudiant au domaine" // Ajout du nom de l'action
                  >
                    Assigner
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              title="Fermer le Modal" // Ajout du nom de l'action
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
