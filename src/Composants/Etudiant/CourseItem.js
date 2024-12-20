import React, { useState } from "react";
import { db } from "../../Config/firebaseConfig";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

const CourseItem = ({ course }) => {
    const [timeRemaining, setTimeRemaining] = useState(course.duration * 60 * 60); // Durée en secondes
    const [started, setStarted] = useState(false);

    const startCourse = async () => {
        setStarted(true);
        const courseRef = doc(db, "courses", course.id);
        await updateDoc(courseRef, { startTime: serverTimestamp() });

        const timer = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    setStarted(false);
                }
                return prev - 1;
            });
        }, 1000);
    };

    return (
        <div className="border p-4 rounded shadow">
            <h2 className="text-lg font-bold">{course.title}</h2>
            <p>{course.description}</p>
            <p>Durée : {course.duration} heures</p>
            {started ? (
                <p className="text-red-500">Temps restant : {Math.floor(timeRemaining / 60)} minutes</p>
            ) : (
                <button
                    onClick={startCourse}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                >
                    Démarrer
                </button>
            )}
        </div>
    );
};

export default CourseItem; 