import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Importer les styles de Quill
import { FaEdit, FaArchive } from "react-icons/fa"; // Importer l'icône d'archive de react-icons


// Exemple d'initialisation des données du cours
// const initialCourseContent = "<h1>Introduction au cours</h1><p>Voici le contenu du cours...</p>";
const coursContent = () => {
return  "<p>This is some <b>HTML</b> courseContent.</p>"
}


function Projets() {
    
      // L'état pour stocker le contenu du cours
  const [courseContent, setCourseContent] = useState(coursContent);
  const [isEditing, setIsEditing] = useState(false); // Nouvel état pour savoir si on est en mode édition

  // Fonction pour gérer les modifications dans l'éditeur WYSIWYG
  const handleEditorChange = (value) => {
    setCourseContent(value);
  };

  // Fonction pour archiver le contenu du cours dans le localStorage
  const archiveCourse = () => {
    localStorage.setItem("archivedCourse", courseContent); // Sauvegarde dans le localStorage
    alert("Le cours a été archivé avec succès !"); // Message de confirmation
  };

  // Fonction pour basculer entre le mode édition et visualisation
  const toggleEdit = () => {
    setIsEditing(!isEditing); // Basculer entre les modes
  };

    return (
        <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold text-center mb-6">Projets de Cours</h1>
  
        {/* Affichage de l'éditeur ou du contenu en fonction de l'état `isEditing` */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
          <h2 className="text-xl font-bold mb-4">Editeur de Cours WYSIWYG</h2>
          {isEditing ? (
            // Si on est en mode édition, on affiche l'éditeur
            <ReactQuill
              value={courseContent}
              onChange={handleEditorChange}
              className="mb-4"
            />
          ) : (
            // Sinon, on affiche le contenu du cours tel quel
            <div
            //   className="border p-4 mt-2 rounded-md bg-gray-100"
            //   dangerouslySetInnerHTML={{ __html: courseContent }}
            />
          )}
        </div>
  
        {/* Conteneur des icônes d'action alignées à droite */}
        <div className="flex justify-end space-x-4">
  
          {/* Icône Modifier / Voir */}
          <button
            onClick={toggleEdit}
            className="bg-yellow-500 text-white p-2 rounded-full"
            title={isEditing ? "Voir le Cours" : "Modifier le Cours"}
          >
            <FaEdit size={24} />
          </button>
  
          {/* Icône Archiver */}
          <button
            onClick={archiveCourse}
            className="bg-green-500 text-white p-2 rounded-full"
            title="Archiver le cours"
          >
            <FaArchive size={24} /> 
          </button>
        </div>
  
        {/* Affichage du contenu sous forme HTML */}
        <div className="mt-8">
          <h2 className="text-xl font-bold">Voir le Cours :</h2>
          <div
            // className="border p-4 mt-2 rounded-md bg-gray-100"
            dangerouslySetInnerHTML={{ __html: courseContent }}
            
          />
        </div>
      </div>
    );
}

export default Projets;