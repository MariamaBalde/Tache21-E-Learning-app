import React from 'react';
import { GraduationCap, Pencil } from 'lucide-react';

const QuickStartItem = ({ title, duration, icon: Icon, gradientFrom, gradientTo, className }) => (
    <div className={`flex items-center bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow ${className}`}>
        <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${gradientFrom} ${gradientTo}`}>
            <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
        </div>
        <div className="ml-4">
            <h3 className="font-medium text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{duration}</p>
        </div>
    </div>
);
const QuickStart = () => {
    const items = [
        {
            title: "Exam",
            duration: "20 min",
            icon: GraduationCap,
            gradientFrom: "from-blue-600",
            gradientTo: "to-blue-300",
        },
        {
            title: "Writing",
            duration: "15 min",
            icon: Pencil,
            gradientFrom: "from-purple-400",
            gradientTo: "to-blue-400",
        },
    ];

    return (
        <div className="bg-gray-50 rounded-2xl p-6 pr-10">
            <h2 className="text-xl text-sky-950 font-bold mb-4">Quick Start</h2>
            <div className="space-y-3">
                {items.map((item, index) => (
                    <QuickStartItem
                        key={index}
                        title={item.title}
                        duration={item.duration}
                        icon={item.icon}
                        gradientFrom={item.gradientFrom}
                        gradientTo={item.gradientTo}
                        className={item.className}
                    />
                ))}
            </div>
        </div>
    );
};

export default QuickStart;