import React from 'react';
import { Users, Star } from 'lucide-react';
import image1 from '../Images/ImagesLandingP/pop1.jpg'
import image2 from '../Images/ImagesLandingP/pop2.jpg'
import image3 from '../Images/ImagesLandingP/pop3.jpg'
import image4 from '../Images/ImagesLandingP/pop4.jpg'
import image5 from '../Images/ImagesLandingP/pop5.jpg'
import image6 from '../Images/ImagesLandingP/pop6.jpg'

const courses = [
    {
        id: 1,
        title: "Apprenez à développer des apps en 30 jours",
        category: "Web Design",
        image: image1,
        students: "500+",
        rating: "4.9",
        // price: "105.00FCA",
    },
    {
        id: 2,
        title: "Graphisme animé avancé",
        category: "Graphics Design",
        image: image2,
        students: "500+",
        rating: "4.9",
        // price: "105.00FCA",
    },
    {
        id: 3,
        title: "Apprenez le développement CMS",
        category: "Web Design",
        image: image3,
        students: "500+",
        rating: "4.9",
        // price: "105.00FCA",
    },
    {
        id: 4,
        title: "Le cours complet de conception web ",
        category: "Web Design",
        image: image4,
        students: "500+",
        rating: "4.9",
        // price: "105.00FCA",
    },
    {
        id: 5,
        title: "Dessin avancé",
        category: "Art",
        image: image5,
        students: "500+",
        rating: "4.9",
        // price: "105.00FCA",
    },
    {
        id: 6,
        title: "Cours avancé de vidéographie",
        category: "Media",
        image: image6,
        students: "500+",
        rating: "4.9",
        // price: "105.00FCA",
    }
];


function CourseCard({ course }) {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="p-3">
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-36 object-cover rounded-lg mb-3"
                />
                <div className="mb-2">
                    <span className="text-xs font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-lg">
                        {course.category}
                    </span>
                </div>
                <h3 className="font-medium text-sm mb-2 line-clamp-2">{course.title}</h3>
                <div className="flex items-center justify-between text-xs">
                    <div className="flex items-start gap-1">
                        <Users size={12} className="text-gray-500" />
                        <span className="text-gray-600">{course.students}</span>
                    </div>
                    <div className="flex items-end gap-1">
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-gray-600">{course.rating}</span>
                    </div>
                    {/* <span className="text-indigo-600 font-medium">{course.price}</span> */}
                </div>
            </div>
        </div>
    );
}

function PopularCourses() {
    return (
        <section id='popularCourses' className="py-8 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-1">Cours populaires</h2>
                        <p className="text-sm text-gray-600">Obtenez le meilleur cours au meilleur prix avec des tuteurs de classe mondiale</p>
                    </div>
               
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default PopularCourses;

