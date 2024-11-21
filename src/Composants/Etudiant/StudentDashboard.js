import React, { useState, useEffect } from "react";
import { db, auth } from "../../Config/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import CourseItem from "../Etudiant/CourseItem";

const StudentDashboard = () => {
    const [courses, setCourses] = useState([]);

    const fetchCourses = async () => {
        const q = query(collection(db, "courses"), where("status", "==", "active"));
        const querySnapshot = await getDocs(q);
        setCourses(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Tableau de bord de l'apprenant</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {courses.map((course) => (
                    <CourseItem key={course.id} course={course} />
                ))}
            </div>
        </div>
    );
};

export default StudentDashboard;
