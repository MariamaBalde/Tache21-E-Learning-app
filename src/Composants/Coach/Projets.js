import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Importer les styles de Quill
import { FaEdit, FaArchive, FaBook, FaPaperPlane } from "react-icons/fa"; // Ajouter l'icône d'envoi
import { ToastContainer, toast } from "react-toastify"; // Importer Toastify
import "react-toastify/dist/ReactToastify.css"; // Importer les styles de Toastify
import { db } from '../../Config/firebaseConfig'; // Importer la configuration Firebase
import { collection, addDoc, updateDoc, doc, query, where, getDocs } from "firebase/firestore"; // Importer les fonctions Firestore

const coursContent = () => {
  return "<p>This is some <b>HTML</b> courseContent.</p>";
};

function Projets() {
  const [courseContent, setCourseContent] = useState(coursContent);
  const [isEditing, setIsEditing] = useState(false);
  const [courseId, setCourseId] = useState(null); // Pour stocker l'ID du cours créé dans Firebase
  const [courses, setCourses] = useState([]); // Etat pour stocker la liste des cours
  const [archivedCourses, setArchivedCourses] = useState([]); // Etat pour stocker les cours archivés
  const [loading, setLoading] = useState(true); // Etat pour gérer le chargement des cours

  // Fonction pour récupérer les cours non archivés depuis Firestore
  const fetchCourses = async () => {
    const q = query(collection(db, "cours"), where("archived", "==", false));
    const querySnapshot = await getDocs(q);
    const fetchedCourses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCourses(fetchedCourses); // Mettre à jour l'état avec les cours non archivés
    setLoading(false); // Fin du chargement
  };

  // Fonction pour récupérer les cours archivés depuis Firestore
  const fetchArchivedCourses = async () => {
    const q = query(collection(db, "cours"), where("archived", "==", true));
    const querySnapshot = await getDocs(q);
    const fetchedArchivedCourses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setArchivedCourses(fetchedArchivedCourses); // Mettre à jour l'état avec les cours archivés
  };

  // Charger les cours au démarrage
  useEffect(() => {
    fetchCourses();
    fetchArchivedCourses();
  }, []);

  const handleEditorChange = (value) => {
    setCourseContent(value);
  };

  // Fonction pour archiver le contenu du cours dans Firebase
  const archiveCourse = async () => {
    if (courseId) {
      const courseRef = doc(db, "cours", courseId);

      try {
        // Mise à jour du cours en ajoutant un champ 'archived' dans Firebase
        await updateDoc(courseRef, {
          archived: true, // Marquer le cours comme archivé
        });
        toast.success("Le cours a été archivé avec succès !");
        // Rafraîchir les cours après archivage
        fetchCourses();
        fetchArchivedCourses();
      } catch (e) {
        toast.error("Erreur lors de l'archivage du cours : " + e.message);
        console.error("Erreur de mise à jour dans Firestore: ", e);
      }
    } else {
      toast.error("Aucun cours à archiver.");
    }
  };

  // Fonction pour d'archiver le contenu du cours dans Firebase
  const unarchiveCourse = async (courseId) => {
    const courseRef = doc(db, "cours", courseId);

    try {
      // Mise à jour du cours en changeant le champ 'archived' à false
      await updateDoc(courseRef, {
        archived: false, // Marquer le cours comme non archivé
      });
      toast.success("Le cours a été désarchivé avec succès !");
      // Rafraîchir les cours après désarchivage
      fetchCourses();
      fetchArchivedCourses();
    } catch (e) {
      toast.error("Erreur lors du désarchivage du cours : " + e.message);
      console.error("Erreur de mise à jour dans Firestore: ", e);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing); // Basculer entre les modes
  };

  // Fonction pour envoyer le contenu du cours à Firebase
  const submitCourse = async () => {
    try {
      const docRef = await addDoc(collection(db, "cours"), {
        content: courseContent,
        timestamp: new Date(),
        archived: false, // Par défaut, le cours n'est pas archivé
      });
      setCourseId(docRef.id); // Sauvegarder l'ID du cours
      toast.success("Le cours a été envoyé avec succès !");
      console.log("Document écrit avec ID: ", docRef.id);
      // Rafraîchir la liste des cours après soumission
      fetchCourses();
    } catch (e) {
      toast.error("Erreur lors de l'envoi du cours : " + e.message);
      console.error("Erreur d'ajout au Firestore: ", e);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">Projets de Cours</h1>

      {/* Editeur de cours */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-4">
        <h2 className="text-xl font-bold mb-4">Editeur de Cours WYSIWYG</h2>
        {isEditing ? (
          <ReactQuill
            value={courseContent}
            onChange={handleEditorChange}
            className="mb-4"
          />
        ) : (
          <div
            className="border p-4 mt-2 rounded-md bg-gray-100"
            dangerouslySetInnerHTML={{ __html: courseContent }}
          />
        )}
      </div>

      {/* Les boutons sont maintenant sous l'éditeur */}
      <div className="flex justify-end space-x-4 mb-4">
        <button
          onClick={toggleEdit}
          className={`${isEditing ? "bg-blue-500" : "bg-yellow-500"} text-white p-2 rounded-full flex justify-center items-center`}
          title={isEditing ? "Voir le Cours" : "Modifier le Cours"}
        >
          {isEditing ? <FaBook size={24} /> : <FaEdit size={24} />}
        </button>

        <button
          onClick={archiveCourse}
          className="bg-green-500 text-white p-2 rounded-full"
          title="Archiver le cours"
        >
          <FaArchive size={24} />
        </button>

        <button
          onClick={submitCourse}
          className="bg-blue-500 text-white p-2 rounded-full"
          title="Envoyer le cours"
        >
          <FaPaperPlane size={24} />
        </button>
      </div>

      {/* Afficher la liste des cours non archivés */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-4">
        <h2 className="text-xl font-bold mb-4">Liste des Cours Non Archivés</h2>
        {loading ? (
          <p>Chargement des cours...</p>
        ) : (
          <ul>
            {courses.map(course => (
              <li key={course.id} className="mb-4 p-4 border-b">
                <div dangerouslySetInnerHTML={{ __html: course.content }} />
                <button
                  onClick={() => setCourseId(course.id)}
                  className="bg-green-500 text-white p-2 rounded-full"
                  title="Archiver le cours"
                >
                  <FaArchive size={24} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Afficher la liste des cours archivés */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-4">
        <h2 className="text-xl font-bold mb-4">Liste des Cours Archivés</h2>
        {loading ? (
          <p>Chargement des cours archivés...</p>
        ) : (
          <ul>
            {archivedCourses.map(course => (
              <li key={course.id} className="mb-4 p-4 border-b">
                <div dangerouslySetInnerHTML={{ __html: course.content }} />
                <button
                  onClick={() => unarchiveCourse(course.id)}
                  className="bg-yellow-500 text-white p-2 rounded-full"
                  title="Désarchiver le cours"
                >
                  <FaArchive size={24} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default Projets;




// import React, { useState, useEffect } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css"; // Importer les styles de Quill
// import { FaEdit, FaArchive, FaBook } from "react-icons/fa"; // Importer l'icône de livre pour le cours

// // Exemple d'initialisation des données du cours
// const coursContent = () => {
//   return "<p>This is some <b>HTML</b> courseContent.</p>";
// };

// function Projets() {
//   // L'état pour stocker le contenu du cours
//   const [courseContent, setCourseContent] = useState(coursContent);
//   const [isEditing, setIsEditing] = useState(false); // Nouvel état pour savoir si on est en mode édition

//   // Fonction pour gérer les modifications dans l'éditeur WYSIWYG
//   const handleEditorChange = (value) => {
//     setCourseContent(value);
//   };

//   // Fonction pour archiver le contenu du cours dans le localStorage
//   const archiveCourse = () => {
//     localStorage.setItem("archivedCourse", courseContent); // Sauvegarde dans le localStorage
//     alert("Le cours a été archivé avec succès !"); // Message de confirmation
//   };

//   // Fonction pour basculer entre le mode édition et visualisation
//   const toggleEdit = () => {
//     setIsEditing(!isEditing); // Basculer entre les modes
//   };

//   // Charger le cours archivé depuis le localStorage au démarrage du composant
//   useEffect(() => {
//     const archivedCourse = localStorage.getItem("archivedCourse");
//     if (archivedCourse) {
//       setCourseContent(archivedCourse); // Si un cours archivé existe, on le charge
//     }
//   }, []);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-semibold text-center mb-6">Projets de Cours</h1>

//       {/* Affichage de l'éditeur ou du contenu en fonction de l'état `isEditing` */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-4">
//         <h2 className="text-xl font-bold mb-4">Editeur de Cours WYSIWYG</h2>
//         {isEditing ? (
//           // Si on est en mode édition, on affiche l'éditeur
//           <ReactQuill
//             value={courseContent}
//             onChange={handleEditorChange}
//             className="mb-4"
//           />
//         ) : (
//           // Sinon, on affiche le contenu du cours tel quel
//           <div
//             className="border p-4 mt-2 rounded-md bg-gray-100"
//             dangerouslySetInnerHTML={{ __html: courseContent }}
//           />
//         )}
//       </div>

//       {/* Conteneur des icônes d'action alignées à droite */}
//       <div className="flex justify-end space-x-4">
//         {/* Icône Voir le Cours (remplacée par une icône de livre) */}
//         <button
//           onClick={toggleEdit}
//           className={`${
//             isEditing ? "bg-blue-500" : "bg-yellow-500"
//           } text-white p-2 rounded-full flex justify-center items-center`} // Appliquer flex, justify-center, items-center pour centrer l'icône
//           title={isEditing ? "Voir le Cours" : "Modifier le Cours"}
//         >
//           {isEditing ? <FaBook size={24} /> : <FaEdit size={24} />} {/* Icône de cours ou de modification */}
//         </button>

//         {/* Icône Archiver */}
//         <button
//           onClick={archiveCourse}
//           className="bg-green-500 text-white p-2 rounded-full"
//           title="Archiver le cours"
//         >
//           <FaArchive size={24} />
//         </button>
//       </div>

//       {/* Affichage du contenu sous forme HTML */}
//       <div className="mt-8">
//         <h2 className="text-xl font-bold">Voir le Cours :</h2>
//         <div
//           className="border p-4 mt-2 rounded-md bg-gray-100"
//           dangerouslySetInnerHTML={{ __html: courseContent }}
//         />
//       </div>
//     </div>
//   );
// }

// export default Projets;