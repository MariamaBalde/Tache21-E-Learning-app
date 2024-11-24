import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

const ProfileSettings = () => {
    const [name, setName] = useState(auth.currentUser.displayName || "");
    const [photoURL, setPhotoURL] = useState(auth.currentUser.photoURL || "");

    const handleUpdateProfile = async () => {
        try {
            await updateProfile(auth.currentUser, { displayName: name, photoURL });
            const userDoc = doc(db, "users", auth.currentUser.uid);
            await updateDoc(userDoc, { name, photoURL });
            alert("Profil mis à jour avec succès !");
        } catch (error) {
            console.error("Erreur lors de la mise à jour :", error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Modifier le profil</h1>
            <div className="my-4">
                <input
                    type="text"
                    placeholder="Nom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 m-2"
                />
                <input
                    type="text"
                    placeholder="URL de la photo"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    className="border p-2 m-2"
                />
                <button
                    onClick={handleUpdateProfile}
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Enregistrer
                </button>
            </div>
        </div>
    );
};

export default ProfileSettings;
