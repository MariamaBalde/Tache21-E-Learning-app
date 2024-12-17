import React, { useState } from "react";
import { FiBell, FiMail, FiSend } from "react-icons/fi";
import Profil from "../Coach/Profil";

const Navbar = ({ currentTask }) => {
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState("");
  const [links, setLinks] = useState("");
  const [image, setImage] = useState(null);
  const [submission, setSubmission] = useState(""); // État pour le contenu livré


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Travail livré :", {
      task: currentTask,
      description,
      links,
      image,
    });
    alert("Votre travail a été envoyé avec succès !");
    setShowModal(false);
    setSubmission("");
    setDescription("");
    setLinks("");
    setImage(null);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <>
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

      {/* {showModal && currentTask && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full border-2 border-gray-300">
            <h2 className="text-2xl font-semibold mb-4">
              Soumettre votre travail pour : {currentTask}
            </h2>
            <form onSubmit={handleSubmit}>
              <textarea
                placeholder="Ajouter une description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                rows="4"
              />
              <input
                type="text"
                placeholder="Ajouter un lien (facultatif)"
                value={links}
                onChange={(e) => setLinks(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md"
                >
                  Annuler
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
                  Soumettre
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}
      {showModal && currentTask && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-red-500 p-6 rounded-lg shadow-lg max-w-lg w-full border-4 border-blue-500">
            <h2 className="text-2xl font-semibold mb-4">
              Soumettre votre travail pour : {currentTask}
            </h2>
            <form onSubmit={handleSubmit}>
              <textarea
                placeholder="Ajouter une description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                rows="4"
              />
              <input
                type="text"
                placeholder="Ajouter un lien (facultatif)"
                value={links}
                onChange={(e) => setLinks(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md"
                >
                  Annuler
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
                  Soumettre
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </>
  );
};

export default Navbar;


