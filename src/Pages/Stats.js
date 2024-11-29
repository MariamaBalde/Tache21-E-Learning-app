import React from 'react';
import { Newspaper, Users, GraduationCap } from 'lucide-react';

function Stats() {
    const stats = [
        { number: '10k+', label: 'TOTAL COURSES', icon: <Newspaper className="w-6 h-6 text-blue-600" />, bgColor: 'bg-blue-100' },
        { number: '500+', label: 'EXPERT MENTORS', icon: <Users className="w-6 h-6 text-orange-600" />, bgColor: 'bg-orange-100' },
        { number: '300k+', label: 'STUDENTS GLOBALLY', icon: <GraduationCap className="w-6 h-6 text-purple-600" />, bgColor: 'bg-purple-100' },
    ];

    return (
        <section id='' className="bg-white py-14">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-lg">
                            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                {stat.icon}
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-indigo-600">{stat.number}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Stats;











