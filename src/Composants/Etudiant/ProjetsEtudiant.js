import React, { useState } from 'react';

const ProjetsEtudiant = () => {
    const [projectDetails, setProjectDetails] = useState({
        title: 'Projet de Validation : Création d’un Site Web',
        description: 'Créer un site web responsive en utilisant HTML, CSS et JavaScript.',
        deadline: '15 décembre 2024',
    });

    const [files, setFiles] = useState([]);
    const [description, setDescription] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Gestion des fichiers
    const handleFileChange = (event) => {
        setFiles([...event.target.files]);
    };

    // Gestion de la soumission
    const handleSubmit = (event) => {
        event.preventDefault();

        if (files.length === 0) {
            alert('Veuillez ajouter au moins un fichier avant de soumettre.');
            return;
        }

        // Exemple de gestion de soumission (envoi vers une API)
        console.log('Description:', description);
        console.log('Fichiers soumis:', files);

        setIsSubmitted(true);
    };

    return (
        <div className="projets-etudiant-container p-6">
            <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">
                Projet de Validation
            </h1>

            <div className="project-details bg-gray-100 p-4 rounded shadow mb-6">
                <h2 className="text-xl font-semibold">{projectDetails.title}</h2>
                <p className="text-gray-600 mt-2">{projectDetails.description}</p>
                <p className="text-gray-500 mt-2">
                    <strong>Date limite : </strong> {projectDetails.deadline}
                </p>
            </div>

            {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                        Description de votre travail (facultatif)
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Ajoutez des notes ou des explications sur votre travail..."
                        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                        Téléchargez vos livrables (captures d’écran, fichiers zip, etc.)
                    </label>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="w-full mb-4"
                    />

                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                    >
                        Soumettre le projet
                    </button>
                </form>
            ) : (
                <div className="bg-green-100 p-4 rounded text-center">
                    <h2 className="text-lg font-semibold text-green-700">
                        Projet soumis avec succès !
                    </h2>
                    <p className="text-green-600 mt-2">
                        Votre projet a été envoyé. Vous serez informé dès qu’il sera évalué.
                    </p>
                </div>
            )}
        </div>
    );
};

export default ProjetsEtudiant;
