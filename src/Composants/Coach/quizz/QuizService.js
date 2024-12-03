import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../../Config/firebaseConfig";

export const addQuiz = async (quizData) => {
  try {
    const docRef = await addDoc(collection(db, "quizzes"), quizData);
    console.log("Quiz ajouté avec succès avec l'ID :", docRef.id);
    return { id: docRef.id, ...quizData };
  } catch (error) {
    console.error("Erreur lors de l'ajout du quiz :", error);
    throw new Error("Échec de l'ajout du quiz");
  }
};

export const toggleArchiveQuiz = async (id, archived) => {
  const quizRef = doc(db, "quizzes", id);
  await updateDoc(quizRef, {
    archived: !archived,
  });
  return !archived;
};