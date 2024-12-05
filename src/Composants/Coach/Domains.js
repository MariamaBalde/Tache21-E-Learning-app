import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../Config/firebaseConfig';
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { FaArchive, FaEdit, FaUsers, FaPlus } from 'react-icons/fa';

const Domains = () => {
  const [domains, setDomains] = useState([]);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchError, setSearchError] = useState(false);
  const [studentsInDomain, setStudentsInDomain] = useState([]);
  const [showStudentsList, setShowStudentsList] = useState(false);

  // Fonction pour récupérer les domaines
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

  // Fonction pour récupérer uniquement les étudiants
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
      setFilteredStudents(studentsData); // Initialiser les étudiants filtrés
    } catch (error) {
      console.error('Erreur lors de la récupération des étudiants :', error);
    }
  };

  // Gestion de la recherche par nom ou email
  const handleSearch = (term) => {
    setSearchTerm(term);

    if (term.trim() === '') {
      setFilteredStudents(students); // Réinitialiser la liste d'étudiants
      setSearchError(false);
      return;
    }

    const filtered = students.filter((student) => {
      const studentName = student.name ? student.name.toLowerCase() : '';
      const studentEmail = student.email ? student.email.toLowerCase() : '';
      return (
        studentName.includes(term.toLowerCase()) ||
        studentEmail.includes(term.toLowerCase())
      );
    });

    setFilteredStudents(filtered);
    setSearchError(filtered.length === 0); // Affiche l'erreur uniquement si aucun résultat
  };

  // Fonction pour assigner un étudiant à un domaine
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
      fetchStudents(); // Rafraîchir la liste des étudiants
      setSearchTerm(''); // Réinitialiser le champ de recherche
      setFilteredStudents(students); // Réinitialiser les résultats filtrés
      setShowModal(false); // Fermer le modal après l'assignation
    } catch (error) {
      console.error("Erreur lors de l'assignation de l'étudiant :", error);
    }
  };

  // Fonction pour désactiver l'assignation d'un étudiant
  const disableAssignment = async (studentId) => {
    try {
      await updateDoc(doc(db, 'users', studentId), {
        domaineId: null, // Dissocier l'étudiant du domaine
      });
      alert('Assignation désactivée avec succès !');
      fetchStudents(); // Rafraîchir la liste des étudiants
      setShowModal(false); // Fermer le modal après la désactivation
    } catch (error) {
      console.error(
        "Erreur lors de la désactivation de l'assignation :",
        error
      );
    }
  };

  // Fonction pour archiver un domaine
  const archiveDomain = (domainId) => {
    alert(
      `Domaine ${domainId} archivé avec succès (fonctionnalité à implémenter).`
    );
  };

  // Fonction pour modifier un domaine
  const editDomain = (domainId) => {
    alert(
      `Modification du domaine ${domainId} (fonctionnalité à implémenter).`
    );
  };

  // Afficher les étudiants assignés à un domaine
  const showStudentsInDomain = (domainId) => {
    const studentsInThisDomain = students.filter(
      (student) => student.domaineId === domainId
    );
    setStudentsInDomain(studentsInThisDomain);
    setShowStudentsList(true); // Afficher la liste des étudiants
  };

  useEffect(() => {
    fetchDomains();
    fetchStudents();
  }, []);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {domains.map((domain) => {
          const studentCount = students.filter(
            (student) => student.domaineId === domain.id
          ).length;

          return (
            <div
              key={domain.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 h-64 flex flex-col justify-between"
            >
              <div>
                <Link
                  to={`/coach/dashboard/domains/${domain.id}`}
                  className="text-xl font-semibold text-blue-600 hover:text-blue-800"
                >
                  {domain.name}
                </Link>
              </div>
              <div className="flex justify-around items-center mt-4">
                <button
                  onClick={() => editDomain(domain.id)}
                  className="text-yellow-500 hover:text-yellow-700 text-xl"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => archiveDomain(domain.id)}
                  className="text-red-500 hover:text-red-700 text-xl"
                >
                  <FaArchive />
                </button>
                <button
                  onClick={() => showStudentsInDomain(domain.id)} // Afficher les étudiants
                  className="relative text-gray-500 hover:text-gray-700 text-xl"
                >
                  <FaUsers />
                  <span
                    className={`absolute top-0 left-0 text-xs font-bold ${
                      studentCount === 0 ? 'text-gray-500' : 'text-red-500'
                    }`}
                    style={{ transform: 'translate(-50%, -50%)' }} // Positionner le chiffre en haut
                  >
                    {studentCount === 0 ? '0' : studentCount}
                  </span>
                </button>
                {/* Ajouter l'icône pour ajouter un étudiant */}
                <button
                  onClick={() => setShowModal(true)}
                  className="text-green-500 hover:text-green-700 text-xl"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              Ajouter un étudiant au domaine
            </h2>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Rechercher par nom ou email"
              className="border rounded px-3 py-2 w-full mb-4"
            />
            {searchError && searchTerm && (
              <p className="text-red-500 mb-2">
                Aucun étudiant ne correspond à "{searchTerm}".
              </p>
            )}
            <ul className="max-h-64 overflow-y-auto">
              {filteredStudents.length === 0 && searchTerm.trim() === '' ? (
                <p className="text-gray-500 text-sm">Aucun étudiant trouvé.</p>
              ) : (
                filteredStudents.map((student) => (
                  <li
                    key={student.id}
                    className={`p-2 flex justify-between items-center ${
                      student.domaineId === selectedDomain ? 'bg-green-100' : ''
                    }`}
                  >
                    <span>
                      {student.name} - {student.email}
                    </span>
                    {student.domaineId ? (
                      <button
                        onClick={() => disableAssignment(student.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Désassigner
                      </button>
                    ) : (
                      <button
                        onClick={() => assignStudentToDomain(student.id)}
                        disabled={student.domaineId === selectedDomain}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Assigner
                      </button>
                    )}
                  </li>
                ))
              )}
            </ul>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Annuler
              </button>
              <button
                onClick={() => assignStudentToDomain()}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Affichage de la liste des étudiants assignés */}
      {showStudentsList && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              Étudiants dans ce domaine
            </h2>
            <ul className="max-h-64 overflow-y-auto">
              {studentsInDomain.length === 0 ? (
                <p className="text-gray-500 text-sm">Aucun étudiant assigné.</p>
              ) : (
                studentsInDomain.map((student) => (
                  <li key={student.id} className="p-2">
                    {student.name} - {student.email}
                  </li>
                ))
              )}
            </ul>
            <button
              onClick={() => setShowStudentsList(false)}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
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
