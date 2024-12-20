import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaArchive } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from '../../Config/firebaseConfig';
import { collection, addDoc, updateDoc, doc, query, where, getDocs } from "firebase/firestore";

function Projets() {
  const [courseContent, setCourseContent] = useState({ title: "", content: "" });
  const [courses, setCourses] = useState([]);
  const [archivedCourses, setArchivedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Récupérer les projets non archivés
  const fetchCourses = async () => {
    const q = query(collection(db, "projet"), where("archived", "==", false));
    const querySnapshot = await getDocs(q);
    const fetchedCourses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCourses(fetchedCourses);
    setLoading(false);
  };

  // Récupérer les projets archivés
  const fetchArchivedCourses = async () => {
    const q = query(collection(db, "projet"), where("archived", "==", true));
    const querySnapshot = await getDocs(q);
    const fetchedArchivedCourses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setArchivedCourses(fetchedArchivedCourses);
  };

  useEffect(() => {
    fetchCourses();
    fetchArchivedCourses();
  }, []);

  // Archiver un projet
  const archiveCourse = async (projetId) => {
    const courseRef = doc(db, "projet", projetId);

    try {
      await updateDoc(courseRef, { archived: true });
      toast.success("Projet archivé avec succès !");
      fetchCourses();
      fetchArchivedCourses();
    } catch (error) {
      toast.error("Échec de l'archivage.");
      console.error("Erreur avec Firestore:", error);
    }
  };

  // Désarchiver un projet
  const unarchiveCourse = async (projetId) => {
    const courseRef = doc(db, "projet", projetId);

    try {
      await updateDoc(courseRef, { archived: false });
      toast.success("Projet désarchivé avec succès !");
      fetchCourses();
      fetchArchivedCourses();
    } catch (error) {
      toast.error("Échec de la désarchivage.");
      console.error("Erreur avec Firestore:", error);
    }
  };

  // Soumettre un nouveau projet
  const submitCourse = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "projet"), {
        title: courseContent.title,
        content: courseContent.content,
        timestamp: new Date(),
        archived: false,
      });
      toast.success("Projet créé avec succès !");
      setCourseContent({ title: "", content: "" });
      fetchCourses();
    } catch (error) {
      toast.error("Échec lors de la création du projet.");
      console.error("Erreur :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-6 bg-gray-50">
      <h1 className="text-2xl font-bold text-start mb-6 text-blue-600">Projets de validation</h1>

      {/* Formulaire de création de projet */}
      <form onSubmit={submitCourse} className="bg-white p-6 rounded-lg shadow-md mb-4">
        <h2 className="text-xl font-bold mb-4">Créer un projet de validation</h2>

        {/* Champ pour le titre */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Titre du projet</label>
          <input
            type="text"
            value={courseContent.title}
            onChange={(e) => setCourseContent({ ...courseContent, title: e.target.value })}
            className="w-full border border-gray-300 rounded px-4 py-2"
            placeholder="Entrez le titre du projet"
            required
          />
        </div>

        {/* Éditeur pour le contenu */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Contenu</label>
          <ReactQuill
            theme="snow"
            value={courseContent.content}
            onChange={(value) => setCourseContent({ ...courseContent, content: value })}
            className="bg-white"
            placeholder="Décrivez le projet ici..."
          />
        </div>

        {/* Bouton de soumission */}
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          disabled={loading}
        >
          {loading ? "Chargement..." : "Créer le projet"}
        </button>
      </form>

      {/* Liste des projets actifs */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-3">Projets actifs</h2>
          {loading ? (
            <p>Chargement...</p>
          ) : (
            <ul className="max-h-full">
              {courses.map(course => (
                <li key={course.id} className="p-2 border-b flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">{course.title}</h3>
                    <div
                      className="break-words overflow-hidden"
                      dangerouslySetInnerHTML={{ __html: course.content }}
                    />
                  </div>
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

        {/* Liste des projets archivés */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-3">Projets archivés</h2>
          <ul className="max-h-60 overflow-auto">
            {archivedCourses.map(course => (
              <li key={course.id} className="p-2 border-b flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{course.title}</h3>
                  <div
                    className="break-words overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: course.content }}
                  />
                </div>
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





