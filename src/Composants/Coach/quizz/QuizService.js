import { db } from "../../../Config/firebaseConfig";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";

// Récupérer tous les quizzes
export const getAllQuizzes = async () => {
  const snapshot = await getDocs(collection(db, "quizzes"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Ajouter un quiz
export const addQuizz = async (quizData) => {
  const docRef = await addDoc(collection(db, "quizzes"), quizData);
  return docRef.id;
};

// Mettre à jour un quiz
export const updateQuizz = async (id, quizData) => {
  const quizDoc = doc(db, "quizzes", id);
  await updateDoc(quizDoc, quizData);
};

// Archiver un quiz
export const archiveQuizz = async (id) => {
  const quizDoc = doc(db, "quizzes", id);
  await updateDoc(quizDoc, { archived: true });
};

// Supprimer un quiz
export const deleteQuizz = async (id) => {
  const quizDoc = doc(db, "quizzes", id);
  await deleteDoc(quizDoc);
};
