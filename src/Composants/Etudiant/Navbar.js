import React, { useState, useEffect } from "react";
import { FiSend, FiMail, FiBell } from "react-icons/fi";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Config/firebaseConfig";
import Profil from "../Coach/Profil";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

// Fonction utilitaire pour les notifications Toastify
const showToast = (message, type = "success") => {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: type === "error" ? "#FF0000" : "#333",
  }).showToast();
};

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]); // Liste pour les tâches démarrées
  const [selectedTask, setSelectedTask] = useState("");
  const [description, setDescription] = useState("");
  const [links, setLinks] = useState("");
  const [image, setImage] = useState(null);

  const fetchStartedCourses = async () => {
    try {
      const coursesRef = collection(db, "cours");
      const coursesSnapshot = await getDocs(query(coursesRef, where("status", "==", "started")));
      const coursesList = coursesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCourses(coursesList);
      showToast("Tâches chargées avec succès !");
    } catch (error) {
      console.error("Erreur lors de la récupération des tâches démarrées :", error);
      showToast("Erreur lors de la récupération des tâches", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStartedCourses();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTask) {
      alert("Veuillez sélectionner une tâche avant de soumettre !");
      return;
    }

    console.log("Travail livré :", {
      task: selectedTask,
      description,
      links,
      image,
    });
    alert("Votre travail a été envoyé avec succès !");
    setShowModal(false);
    setDescription("");
    setLinks("");
    setImage(null);
    setSelectedTask("");
  };

  return (
    <>
      {/* Barre de navigation */}
      <header className="flex justify-between items-center p-4 bg-[#191970] shadow-md">
        <div className="flex-1"></div>
        <div className="flex-1 flex justify-center">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 p-2 bg-blue-500 text-white rounded-lg"
          >
            <FiSend className="text-lg" />
            <span>Envoyer mon travail</span>
          </button>
        </div>
        <div className="flex-1 flex justify-end items-center space-x-4 text-white">
          <FiMail className="cursor-pointer text-3xl" />
          <FiBell className="text-3xl" />
          <Profil />
        </div>
      </header>

      {/* Modal pour soumettre le travail */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-5xl w-[90%] border-4">
            <h2 className="text-2xl font-semibold mb-6 text-center">Soumettre votre travail</h2>
            {loading ? (
              <p>Chargement des tâches...</p>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Dropdown pour la sélection de la tâche */}
                <div className="mb-4">
                  <label
                    htmlFor="task-select"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Sélectionnez une tâche
                  </label>
                  <select
                    id="task-select"
                    value={selectedTask}
                    onChange={(e) => setSelectedTask(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  >
                    <option value="">-- Sélectionnez une tâche --</option>
                    {courses?.length > 0
                      ? courses.map((course, index) => (
                          <option key={course.id} value={course.id}>
                            Tâche {index + 1} : {course.name}
                          </option>
                        ))
                      : (
                        <option disabled>Aucune tâche trouvée</option>
                      )
                    }
                  </select>
                </div>

                {/* Description */}
                <textarea
                  placeholder="Ajouter une description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md mb-4"
                  rows="4"
                />

                {/* Lien */}
                <input
                  type="text"
                  placeholder="Ajouter un lien (facultatif)"
                  value={links}
                  onChange={(e) => setLinks(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md mb-4"
                />

                {/* Input pour l'image */}
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full p-3 border border-gray-300 rounded-md mb-4"
                />

                {/* Boutons */}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-700"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                  >
                    Soumettre
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
















// import React, { useState } from "react";
// import { FiBell, FiMail, FiSend } from "react-icons/fi";
// import Profil from "../Coach/Profil";

// const Navbar = ({ currentTask }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [description, setDescription] = useState("");
//   const [links, setLinks] = useState("");
//   const [image, setImage] = useState(null);
//   const [submission, setSubmission] = useState(""); // État pour le contenu livré


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Travail livré :", {
//       task: currentTask,
//       description,
//       links,
//       image,
//     });
//     alert("Votre travail a été envoyé avec succès !");
//     setShowModal(false);
//     setSubmission("");
//     setDescription("");
//     setLinks("");
//     setImage(null);
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   return (
//     <>
//       <header className="flex justify-between items-center p-4 bg-[#191970] shadow-md">
//         <div className="flex-1"></div>
//         <div className="flex-1 flex justify-center">
//           <button
//             onClick={() => setShowModal(true)}
//             className="flex items-center space-x-2 p-2 bg-blue-500 text-white rounded-lg"
//           >
//             <FiSend className="text-lg" />
//             <span>Envoyer mon travail</span>
//           </button>
//         </div>
//         <div className="flex-1 flex justify-end items-center space-x-4 text-white">
//           <FiMail className="cursor-pointer text-3xl" />
//           <FiBell className="text-3xl" />
//           <Profil />
//         </div>
//       </header>

//       {showModal && currentTask && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
//           <div className="bg-red-500 p-6 rounded-lg shadow-lg max-w-lg w-full border-4 border-blue-500">
//             <h2 className="text-2xl font-semibold mb-4">
//               Soumettre votre travail pour : {currentTask}
//             </h2>
//             <form onSubmit={handleSubmit}>
//               <textarea
//                 placeholder="Ajouter une description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded-md mb-4"
//                 rows="4"
//               />
//               <input
//                 type="text"
//                 placeholder="Ajouter un lien (facultatif)"
//                 value={links}
//                 onChange={(e) => setLinks(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded-md mb-4"
//               />
//               <input
//                 type="file"
//                 onChange={handleImageChange}
//                 className="w-full p-2 border border-gray-300 rounded-md mb-4"
//               />
//               <div className="flex justify-end space-x-4">
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   className="px-4 py-2 bg-gray-500 text-white rounded-md"
//                 >
//                   Annuler
//                 </button>
//                 <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
//                   Soumettre
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//     </>
//   );
// };

// export default Navbar;







