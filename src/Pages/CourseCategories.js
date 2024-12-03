// import React from 'react';



import React from 'react';
import { PenSquare, Volume2, BarChart2, PieChart, Wallet, Users } from 'lucide-react';

function CourseCategories() {
    const categories = [
        {
            name: 'Design & Development',
            icon: PenSquare,
            courses: '250+ cours disponibles',
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-500'
        },
        {
            name: 'Marketing & Communication',
            icon: Volume2,
            courses: '300+ cours disponibles',
            bgColor: 'bg-indigo-500',
            iconColor: 'text-white'
        },
        {
            name: 'Digital Marketing',
            icon: BarChart2,
            courses: '150+ cours disponibles',
            bgColor: 'bg-orange-50',
            iconColor: 'text-orange-500'
        },
        {
            name: 'Business & Consulting',
            icon: PieChart,
            courses: '170+ cours disponibles',
            bgColor: 'bg-pink-50',
            iconColor: 'text-pink-500'
        },
        {
            name: 'Finance Management',
            icon: Wallet,
            courses: '300+ cours disponibles',
            bgColor: 'bg-purple-50',
            iconColor: 'text-purple-500'
        },
        {
            name: 'Self Development',
            icon: Users,
            courses: '50+ cours disponibles',
            bgColor: 'bg-green-50',
            iconColor: 'text-green-500'
        },
    ];

    return (
        <section id='courses' className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">
                            Explorer les cours par catégorie</h2>
                        <p className="text-gray-500 text-sm">
                            Parcourez les cours de haut niveau en parcourant notre catégorie qui sera plus simple pour vous.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category, index) => {
                        const Icon = category.icon;
                        return (
                            <div
                                key={index}
                                className="flex items-start p-6 rounded-xl transition-shadow hover:shadow-md cursor-pointer"
                            >
                                <div className={`p-4 rounded-xl ${category.bgColor} mr-4`}>
                                    <Icon className={`w-6 h-6 ${category.iconColor}`} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-base mb-1">{category.name}</h3>
                                    <p className="text-sm text-gray-400">{category.courses}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default CourseCategories;




