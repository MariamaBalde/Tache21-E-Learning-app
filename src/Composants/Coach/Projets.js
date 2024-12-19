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
//     const q = query(collection(db, "projet"), where("archived", "==", false));
//     const querySnapshot = await getDocs(q);
//     const fetchedCourses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     setCourses(fetchedCourses);
//     setLoading(false);
//   };

//   const fetchArchivedCourses = async () => {
//     const q = query(collection(db, "projet"), where("archived", "==", true));
//     const querySnapshot = await getDocs(q);
//     const fetchedArchivedCourses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     setArchivedCourses(fetchedArchivedCourses);
//   };

//   useEffect(() => {
//     fetchCourses();
//     fetchArchivedCourses();
//   }, []);

//   const handleEditorChange = (value) => setCourseContent(value);

//   const archiveCourse = async (projetId) => {
//     const courseRef = doc(db, "projet", projetId);

//     try {
//       await updateDoc(courseRef, { archived: true });
//       toast.success("Cours archivé avec succès !");
//       fetchCourses();
//       fetchArchivedCourses();
//     } catch (error) {
//       toast.error("Échec de l'archivage.");
//       console.error("Erreur avec Firestore:", error);
//     }
//   };

//   const unarchiveCourse = async (projetId) => {
//     const courseRef = doc(db, "projet", projetId);

//     try {
//       await updateDoc(courseRef, { archived: false });
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
//       const docRef = await addDoc(collection(db, "projet"), {
//         content: courseContent,
//         timestamp: new Date(),
//         archived: false,
//       });
//       toast.success("Cours soumis avec succès !");
//       fetchCourses();
//     } catch (error) {
//       toast.error("Échec lors de l'envoi du cours.");
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 sm:px-6 lg:px-6 bg-gray-50">
//       <h1 className="text-2xl font-bold text-start mb-6 text-blue-600">Projets de Cours</h1>

//       {/* Éditeur de contenu */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-4">
//         <h2 className="text-xl font-bold mb-4">Éditeur de contenu</h2>
//         {isEditing ? (
//           <ReactQuill
//             value={courseContent}
//             onChange={handleEditorChange}
//             className="mb-4"
//           />
//         ) : (
//           <div
//             className="border p-4 mt-2 rounded-md bg-gray-100"
//             dangerouslySetInnerHTML={{ __html: courseContent }}
//           />
//         )}
//       </div>

//       {/* Boutons principaux */}
//       <div className="flex flex-wrap justify-end space-x-4 mb-4">
//         <div
//           onClick={toggleEditMode}
//           className={`${isEditing ? "bg-blue-500" : "bg-yellow-500"} cursor-pointer text-white p-2 rounded-full flex justify-center items-center`}
//           title={isEditing ? "Voir le contenu" : "Modifier le contenu"}
//         >
//           {isEditing ? <FaBook size={20} /> : <FaEdit size={20} />}
//         </div>
//         <div
//           onClick={submitCourse}
//           className="bg-blue-500 cursor-pointer text-white p-2 rounded-full flex justify-center items-center"
//           title="Envoyer le cours"
//         >
//           <FaPaperPlane size={20} />
//         </div>
//       </div>

//       {/* Liste des cours avec responsivité */}
//       <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
//         <div className="bg-white p-4 rounded-lg shadow-md">
//           <h2 className="text-xl font-bold mb-3">Projet</h2>
//           {loading ? (
//             <p>Chargement...</p>
//           ) : (
//             <ul className="max-h-60 overflow-auto">
//               {courses.map(course => (
//                 <li key={course.id} className="p-2 border-b flex justify-between items-center">
//                   <div
//                     className="break-words overflow-hidden"
//                     dangerouslySetInnerHTML={{ __html: course.content }}
//                   />
//                   <div
//                     onClick={() => archiveCourse(course.id)}
//                     className="cursor-pointer text-green-500 hover:text-green-700"
//                     title="Archiver"
//                   >
//                     <FaArchive size={20} />
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <div className="bg-white p-4 rounded-lg shadow-md">
//           <h2 className="text-xl font-bold mb-3">Projet Archivés</h2>
//           <ul className="max-h-60 overflow-auto">
//             {archivedCourses.map(course => (
//               <li key={course.id} className="p-2 border-b flex justify-between items-center">
//                 <div
//                   className="break-words overflow-hidden"
//                   dangerouslySetInnerHTML={{ __html: course.content }}
//                 />
//                 <div
//                   onClick={() => unarchiveCourse(course.id)}
//                   className="cursor-pointer text-yellow-500 hover:text-yellow-700"
//                   title="Désarchiver"
//                 >
//                   <FaArchive size={20} />
//                 </div>
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

// 2
// import React, { useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { db } from '../../Config/firebaseConfig'; 
// import { collection, addDoc } from "firebase/firestore";

// const Projets = ({ sousDomaineId }) => {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       // Ajouter le projet dans Firestore
//       await addDoc(collection(db, "projet"), {
//         title,
//         content,
//         sousDomaineId, // Associe le projet au cours
//         createdAt: new Date(),
//       });

//       alert("Projet créé avec succès !");
//       setTitle("");
//       setContent("");
//     } catch (error) {
//       console.error("Erreur lors de la création du projet :", error);
//       alert("Une erreur s'est produite.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto bg-white shadow-md rounded p-6">
//       <h1 className="text-2xl font-bold mb-4">Créer un projet de validation</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2">Titre du projet</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full border border-gray-300 rounded px-4 py-2"
//             placeholder="Entrez le titre du projet"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2">Contenu</label>
//           <ReactQuill
//             theme="snow"
//             value={content}
//             onChange={setContent}
//             className="bg-white"
//             placeholder="Décrivez le projet ici..."
//           />
//         </div>

//         <button
//           type="submit"
//           className={`w-full bg-blue-500 text-white py-2 px-4 rounded ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
//             }`}
//           disabled={isLoading}
//         >
//           {isLoading ? "Chargement..." : "Créer le projet"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Projets;
// 2


import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { db } from '../../Config/firebaseConfig'; 
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

const Projets = ({ sousDomaineId }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Récupérer les projets existants
  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     const q = query(
  //       collection(db, "cours"),
  //       where("sousDomaineId", "==", sousDomaineId)
  //     );
  //     const querySnapshot = await getDocs(q);
  //     setProjects(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  //   };

  //   fetchProjects();
  // }, [sousDomaineId]);

  // Soumettre un nouveau projet
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Ajouter le projet dans Firestore
      await addDoc(collection(db, "project"), {
        title,
        content,
        sousDomaineId, // Associe le projet au cours
        createdAt: new Date(),
      });

      alert("Projet créé avec succès !");
      setTitle("");
      setContent("");

      // Recharger les projets après ajout
      const q = query(
        collection(db, "project"),
        // where("sousDomaineId", "==", sousDomaineId)
      );
      const querySnapshot = await getDocs(q);
      setProjects(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Erreur lors de la création du projet :", error);
      alert("Une erreur s'est produite.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded p-6">
      {/* Création de projet */}
      <h1 className="text-2xl font-bold mb-4">Créer un projet de validation</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Titre du projet</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2"
            placeholder="Entrez le titre du projet"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Contenu</label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            className="bg-white"
            placeholder="Décrivez le projet ici..."
          />
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          disabled={isLoading}
        >
          {isLoading ? "Chargement..." : "Créer le projet"}
        </button>
      </form>

      {/* Liste des projets */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Projets de validation</h2>
        <ul>
          {projects.map((project) => (
            <li key={project.id} className="mb-4 border-b pb-4">
              <h3 className="text-xl font-bold">{project.title}</h3>
              <div
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: project.content }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Projets;



