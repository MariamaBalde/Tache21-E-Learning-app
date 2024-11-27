import React, { useState } from 'react';
import { storage, db } from '../../Config/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';

const UploadImage = ({ sousDomaineId, domaineName, onUploadComplete }) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleUpload = async () => {
    if (!image || !sousDomaineId || !domaineName) return;

    setUploading(true);
    const storageRef = ref(
      storage,
      `domains/${domaineName}/sous-domaines/${sousDomaineId}/${image.name}`
    );

    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Erreur lors de l'upload :", error);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log('Image téléversée à :', downloadURL);

        // Mettre à jour Firestore
        const sousDomaineRef = doc(db, 'sous-domaines', sousDomaineId);
        await updateDoc(sousDomaineRef, {
          imageURL: downloadURL,
        });

        // Notifier le parent
        onUploadComplete && onUploadComplete();
        setUploading(false);
        setImage(null);
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
      >
        {uploading ? 'Téléversement...' : "Téléverser l'image"}
      </button>
    </div>
  );
};

export default UploadImage;
