
import React, { useState, useEffect } from 'react';
import GradientCard from './GradientCard';
import { Users, FileText, CheckSquare } from 'lucide-react';
import Statistics from './Statistics';
import { db } from '../../Config/firebaseConfig';
import { collection, getDocs, query, where, onSnapshot } from 'firebase/firestore';

const Dashboard = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [domainCount, setDomainCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0); 
  const [domainData, setDomainData] = useState([]);
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    const fetchStudentCount = async () => {
      const studentQuery = query(collection(db, 'users'), where('role', '==', 'etudiant'));
      const snapshot = await getDocs(studentQuery);
      setStudentCount(snapshot.size);
    };

    const fetchDomainData = () => {
      const monthlyData = Array(12).fill(0);
      const unsubscribe = onSnapshot(collection(db, 'domaines'), (snapshot) => {
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          if (data.createdAt) {
            const month = new Date(data.createdAt.toDate()).getMonth() + 1;
            monthlyData[month - 1] += 1;
          }
        });
        setDomainData(monthlyData);
        setDomainCount(snapshot.size);
      });
      
      return unsubscribe;
    };

    const fetchCourseData = () => {
      const monthlyData = Array(12).fill(0);
      const unsubscribe = onSnapshot(collection(db, 'cours'), (snapshot) => {
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          if (data.createdAt) {
            const month = new Date(data.createdAt.toDate()).getMonth() + 1;
            monthlyData[month - 1] += 1;
          }
        });
        setCourseData(monthlyData);
        setCourseCount(snapshot.size);
      });

      return unsubscribe;
    };

    fetchStudentCount();
    const unsubscribeDomain = fetchDomainData();
    const unsubscribeCourse = fetchCourseData();

    return () => {
      unsubscribeDomain();
      unsubscribeCourse();
    };
  }, []);
  return (
    <main className="px-6 bg-gray-50">
      <h2 className="text-xl text-blue-600 font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <GradientCard
          title="Étudiants"
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
      <section className="mt-8 grid grid-cols-1 lg:grid-cols-1">
        <Statistics domainData={domainData} courseData={courseData} />
      </section>
    </main>
  );
};
export default Dashboard;




// import React, { useState, useEffect } from 'react';
// import GradientCard from './GradientCard';
// import { Users, FileText, CheckSquare } from 'lucide-react';
// import Statistics from './Statistics';
// import { db } from '../../Config/firebaseConfig';
// import { collection, getDocs, query, where } from 'firebase/firestore';
// const Dashboard = () => {
//   const [studentCount, setStudentCount] = useState(0);
//   const [domainCount, setDomainCount] = useState(0);
//   const [courseCount, setCourseCount] = useState(0);

//   useEffect(() => {
//     // Récupérer le nombre d'étudiants
//     const fetchStudentCount = async () => {
//       const studentQuery = query(collection(db, 'users'), where('role', '==', 'etudiant'));
//       const snapshot = await getDocs(studentQuery);
//       setStudentCount(snapshot.size);
//     };

//     // Récupérer le nombre de domaines
//     const fetchDomainCount = async () => {
//       const domainSnapshot = await getDocs(collection(db, 'domaines'));
//       setDomainCount(domainSnapshot.size);
//     };

//     // Récupérer le nombre de cours
//     const fetchCourseCount = async () => {
//       const courseSnapshot = await getDocs(collection(db, 'cours')); // Assurez-vous que la collection des cours est bien nommée "courses"
//       setCourseCount(courseSnapshot.size);
//     };

//     fetchStudentCount();
//     fetchDomainCount();
//     fetchCourseCount();
//   }, []);

//   return (
//     <main className="px-6 bg-gray-50">
//       <h2 className="text-xl text-blue-600 font-bold mb-6">Dashboard</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         <GradientCard
//           title="Étudiants Coachés"
//           icon={Users}
//           gradient="bg-gradient-to-br from-blue-600 to-blue-300"
//           count={studentCount} // Passer le nombre d'étudiants
//         />
//         <GradientCard
//           title="Syllabus créés"
//           icon={FileText}
//           gradient="bg-gradient-to-br from-blue-300 to-[#FF66FF]"
//           count={domainCount} // Passer le nombre de domaines
//         />
//         <GradientCard
//           title="Tâches"
//           icon={CheckSquare}
//           gradient="bg-gradient-to-br from-blue-200 to-blue-800"
//           count={courseCount} // Passer le nombre de cours
//         />
//       </div>
//       <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {/* Statistics prend toutes les colonnes sur les écrans larges */}
//         <div className="lg:col-span-full">
//           <Statistics />
//         </div>
//       </section>
//     </main>
//   );
// };
// export default Dashboard;



