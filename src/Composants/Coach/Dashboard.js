
import React, { useState, useEffect } from 'react';
import GradientCard from './GradientCard';
import { Users, FileText, CheckSquare } from 'lucide-react';
import Statistics from './Statistics';
import QuickStart from './QuickStart';
import { db } from '../../Config/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

const Dashboard = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [domainCount, setDomainCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);

  useEffect(() => {
    // Récupérer le nombre d'étudiants
    const fetchStudentCount = async () => {
      const studentQuery = query(collection(db, 'users'), where('role', '==', 'etudiant'));
      const snapshot = await getDocs(studentQuery);
      setStudentCount(snapshot.size);
    };

    // Récupérer le nombre de domaines
    const fetchDomainCount = async () => {
      const domainSnapshot = await getDocs(collection(db, 'domaines'));
      setDomainCount(domainSnapshot.size);
    };

    // Récupérer le nombre de cours
    const fetchCourseCount = async () => {
      const courseSnapshot = await getDocs(collection(db, 'cours')); // Assurez-vous que la collection des cours est bien nommée "courses"
      setCourseCount(courseSnapshot.size);
    };

    fetchStudentCount();
    fetchDomainCount();
    fetchCourseCount();
  }, []);

  return (
    <main className="px-6">
      <h2 className="text-xl text-sky-950 font-bold mb-4">Word Sets</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <GradientCard
          title="Étudiants Coachés"
          icon={Users}
          gradient="bg-gradient-to-br from-blue-600 to-blue-300"
          count={studentCount} // Passer le nombre d'étudiants
        />
        <GradientCard
          title="Syllabus créés"
          icon={FileText}
          gradient="bg-gradient-to-br from-blue-300 to-[#FF66FF]"
          count={domainCount} // Passer le nombre de domaines
        />
        <GradientCard
          title="Tâches"
          icon={CheckSquare}
          gradient="bg-gradient-to-br from-blue-200 to-blue-800"
          count={courseCount} // Passer le nombre de cours
        />
      </div>
      <section className="mt-8 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Statistics prend 2 colonnes sur les écrans larges */}
        <div className="lg:col-span-2">
          <Statistics />
        </div>

        {/* QuickStart prend 1 colonne */}
        <div className="lg:col-span-1">
          <QuickStart />
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
