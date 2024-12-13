import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaEdit, FaArchive, FaBook, FaPaperPlane } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from '../../Config/firebaseConfig';
import { collection, addDoc, updateDoc, doc, query, where, getDocs } from "firebase/firestore";

// Édition de contenu par défaut
const defaultCourseContent = () => "<p>This is some <b>HTML</b> courseContent.</p>";

function Projets() {
  const [courseContent, setCourseContent] = useState(defaultCourseContent);
  const [isEditing, setIsEditing] = useState(false);
  const [courses, setCourses] = useState([]);
  const [archivedCourses, setArchivedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    const q = query(collection(db, "cours"), where("archived", "==", false));
    const querySnapshot = await getDocs(q);
    const fetchedCourses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCourses(fetchedCourses);
    setLoading(false);
  };

  const fetchArchivedCourses = async () => {
    const q = query(collection(db, "cours"), where("archived", "==", true));
    const querySnapshot = await getDocs(q);
    const fetchedArchivedCourses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setArchivedCourses(fetchedArchivedCourses);
  };

  useEffect(() => {
    fetchCourses();
    fetchArchivedCourses();
  }, []);

  const handleEditorChange = (value) => setCourseContent(value);

  const archiveCourse = async (courseId) => {
    const courseRef = doc(db, "cours", courseId);

    try {
      await updateDoc(courseRef, { archived: true });
      toast.success("Cours archivé avec succès !");
      fetchCourses();
      fetchArchivedCourses();
    } catch (error) {
      toast.error("Échec de l'archivage.");
      console.error("Erreur avec Firestore:", error);
    }
  };

  const unarchiveCourse = async (courseId) => {
    const courseRef = doc(db, "cours", courseId);

    try {
      await updateDoc(courseRef, { archived: false });
      toast.success("Cours désarchivé avec succès !");
      fetchCourses();
      fetchArchivedCourses();
    } catch (error) {
      toast.error("Échec de la désarchivage.");
      console.error("Erreur avec Firestore:", error);
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const submitCourse = async () => {
    try {
      const docRef = await addDoc(collection(db, "cours"), {
        content: courseContent,
        timestamp: new Date(),
        archived: false,
      });
      toast.success("Cours soumis avec succès !");
      fetchCourses();
    } catch (error) {
      toast.error("Échec lors de l'envoi du cours.");
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <h1 className="text-3xl font-semibold text-center mb-6">Projets de Cours</h1>

      {/* Éditeur de contenu */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-4">
        <h2 className="text-xl font-bold mb-4">Éditeur de contenu</h2>
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

      {/* Boutons principaux */}
      <div className="flex flex-wrap justify-end space-x-4 mb-4">
        <div
          onClick={toggleEditMode}
          className={`${isEditing ? "bg-blue-500" : "bg-yellow-500"} cursor-pointer text-white p-2 rounded-full flex justify-center items-center`}
          title={isEditing ? "Voir le contenu" : "Modifier le contenu"}
        >
          {isEditing ? <FaBook size={20} /> : <FaEdit size={20} />}
        </div>
        <div
          onClick={submitCourse}
          className="bg-blue-500 cursor-pointer text-white p-2 rounded-full flex justify-center items-center"
          title="Envoyer le cours"
        >
          <FaPaperPlane size={20} />
        </div>
      </div>

      {/* Liste des cours avec responsivité */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-3">Cours Non Archivés</h2>
          {loading ? (
            <p>Chargement...</p>
          ) : (
            <ul className="max-h-60 overflow-auto">
              {courses.map(course => (
                <li key={course.id} className="p-2 border-b flex justify-between items-center">
                  <div
                    className="break-words overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: course.content }}
                  />
                  <div
                    onClick={() => archiveCourse(course.id)}
                    className="cursor-pointer text-green-500 hover:text-green-700"
                    title="Archiver"
                  >
                    <FaArchive size={20} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-3">Cours Archivés</h2>
          <ul className="max-h-60 overflow-auto">
            {archivedCourses.map(course => (
              <li key={course.id} className="p-2 border-b flex justify-between items-center">
                <div
                  className="break-words overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: course.content }}
                />
                <div
                  onClick={() => unarchiveCourse(course.id)}
                  className="cursor-pointer text-yellow-500 hover:text-yellow-700"
                  title="Désarchiver"
                >
                  <FaArchive size={20} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Projets;








// import React, { useState, useEffect } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { FaEdit, FaArchive, FaBook, FaPaperPlane } from "react-icons/fa";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { db } from '../../Config/firebaseConfig';
// import { collection, addDoc, updateDoc, doc, query, where, getDocs } from "firebase/firestore";

// // Édition de contenu par défaut
// const defaultCourseContent = () => "<p>This is some <b>HTML</b> courseContent.</p>";

// function Projets() {
//   const [courseContent, setCourseContent] = useState(defaultCourseContent);
//   const [isEditing, setIsEditing] = useState(false);
//   const [courses, setCourses] = useState([]);
//   const [archivedCourses, setArchivedCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchCourses = async () => {
//     const q = query(collection(db, "cours"), where("archived", "==", false));
//     const querySnapshot = await getDocs(q);
//     const fetchedCourses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     setCourses(fetchedCourses);
//     setLoading(false);
//   };

//   const fetchArchivedCourses = async () => {
//     const q = query(collection(db, "cours"), where("archived", "==", true));
//     const querySnapshot = await getDocs(q);
//     const fetchedArchivedCourses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     setArchivedCourses(fetchedArchivedCourses);
//   };

//   useEffect(() => {
//     fetchCourses();
//     fetchArchivedCourses();
//   }, []);

//   const handleEditorChange = (value) => setCourseContent(value);

//   const archiveCourse = async (courseId) => {
//     const courseRef = doc(db, "cours", courseId);

//     try {
//       await updateDoc(courseRef, {
//         archived: true,
//       });
//       toast.success("Cours archivé avec succès !");
//       fetchCourses();
//       fetchArchivedCourses();
//     } catch (error) {
//       toast.error("Échec de l'archivage.");
//       console.error("Erreur avec Firestore:", error);
//     }
//   };

//   const unarchiveCourse = async (courseId) => {
//     const courseRef = doc(db, "cours", courseId);

//     try {
//       await updateDoc(courseRef, {
//         archived: false,
//       });
//       toast.success("Cours désarchivé avec succès !");
//       fetchCourses();
//       fetchArchivedCourses();
//     } catch (error) {
//       toast.error("Échec de la désarchivage.");
//       console.error("Erreur avec Firestore:", error);
//     }
//   };

//   const toggleEditMode = () => {
//     setIsEditing(!isEditing);
//   };

//   const submitCourse = async () => {
//     try {
//       const docRef = await addDoc(collection(db, "cours"), {
//         content: courseContent,
//         timestamp: new Date(),
//         archived: false,
//       });
//       toast.success("Cours soumis avec succès !");
//       fetchCourses();
//       console.log("ID du document : ", docRef.id);
//     } catch (error) {
//       toast.error("Échec lors de l'envoi du cours.");
//       console.error("Erreur lors de l'ajout dans Firestore : ", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-semibold text-center mb-6">Projets de Cours</h1>

//       {/* Éditeur + Boutons principaux en mode Grid */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
//           {/* Éditeur */}
//           <div className="p-4">
//             <h2 className="text-xl font-bold mb-4">Éditeur de contenu</h2>
//             {isEditing ? (
//               <ReactQuill
//                 value={courseContent}
//                 onChange={handleEditorChange}
//                 className="mb-4"
//               />
//             ) : (
//               <div
//                 className="border p-4 mt-2 rounded-md bg-gray-100"
//                 dangerouslySetInnerHTML={{ __html: courseContent }}
//               />
//             )}
//           </div>

//           {/* Boutons principaux */}
//           <div className="flex justify-end space-x-4 mb-4 md:mb-0">
//             <button
//               onClick={toggleEditMode}
//               className={`${isEditing ? "bg-blue-500" : "bg-yellow-500"} text-white p-2 rounded-full`}
//               title={isEditing ? "Voir le contenu" : "Modifier le contenu"}
//             >
//               {isEditing ? <FaBook size={24} /> : <FaEdit size={24} />}
//             </button>

//             <button
//               onClick={submitCourse}
//               className="bg-blue-500 text-white p-2 rounded-full"
//               title="Envoyer le cours"
//             >
//               <FaPaperPlane size={24} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Affichage des cours non archivés et archivés en mode Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
//         {/* Liste des cours non archivés */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-bold mb-4">Cours Non Archivés</h2>
//           {loading ? (
//             <p>Chargement...</p>
//           ) : (
//             <ul>
//               {courses.map(course => (
//                 <li key={course.id} className="mb-4 p-4 border-b">
//                   <div dangerouslySetInnerHTML={{ __html: course.content }} />
//                   <button
//                     onClick={() => archiveCourse(course.id)}
//                     className="bg-green-500 text-white p-2 rounded-full"
//                     title="Archiver le cours"
//                   >
//                     <FaArchive size={20} />
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Liste des cours archivés */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-bold mb-4">Cours Archivés</h2>
//           <ul>
//             {archivedCourses.map(course => (
//               <li key={course.id} className="mb-4 p-4 border-b">
//                 <div dangerouslySetInnerHTML={{ __html: course.content }} />
//                 <button
//                   onClick={() => unarchiveCourse(course.id)}
//                   className="bg-yellow-500 text-white p-2 rounded-full"
//                   title="Désarchiver le cours"
//                 >
//                   <FaArchive size={20} />
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// }

// export default Projets;






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