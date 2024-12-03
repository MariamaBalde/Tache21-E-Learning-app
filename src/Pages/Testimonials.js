import React from 'react';
import { useState } from 'react';
import { Star } from 'lucide-react';
import Imagemari from '../Images/ImagesLandingP/mari.jpg';
import Imagebine from '../Images/ImagesLandingP/bine1.jpg';
import Imagedoucs from '../Images/ImagesLandingP/doucs.jpg';

function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);

    const testimonials = [
        {
            id: 1,
            name: "Mari",
            avatar: Imagemari,
            text: "Arr-diangue m'a aidé à élargir mes connaissances à travers des cours variés. Les instructeurs sont extrêmement efficaces et utiles pour ma carrière..",
            rating: 5,
            bgColor: "bg-white"
        },
        {
            id: 2,
            name: "Bine",
            avatar: Imagebine,
            text: "Arr-diangue  m'a aidé à élargir mes connaissances à travers des cours variés. Les instructeurs sont extrêmement efficaces et utiles pour ma carrière..",
            rating: 5,
            bgColor: "bg-white"
        },
        {
            id: 3,
            name: "Doucs",
            avatar: Imagedoucs,
            text: "Arr-diangue m'a aidé à élargir mes connaissances à travers des cours variés. Les instructeurs sont extrêmement efficaces et utiles pour ma carrière..",
            rating: 5,
            bgColor: "bg-white"
        },
        
    ];

    const handleDotClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2">Ce que nos étudiants disent de nous</h2>
                    <p className="text-gray-500 text-sm">
                        Vous apprenez aujourd'hui et gagnez demain. Les racines de l’éducation sont amères mais les fruits sont doux.
                    </p>
                </div>

                {/* Grid responsive: 1 column for small screens, 2 columns for medium, 3 columns for large */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.id}
                            className={`p-6 rounded-2xl ${testimonial.bgColor} ${testimonial.bgColor === "bg-indigo-600" ? "text-white" : "text-gray-800"
                                } shadow-lg transition-all duration-300 hover:shadow-xl`}
                        >
                            <p className="text-sm font-medium mb-1">Grande plateforme</p>
                            <p className={`text-sm mb-8 ${testimonial.bgColor === "bg-indigo-600" ? "text-white/90" : "text-gray-600"
                                }`}>
                                {testimonial.text}
                            </p>

                            <div className="flex items-center">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full mr-3"
                                />
                                <div>
                                    <h4 className="text-sm font-medium">{testimonial.name}</h4>
                                    <div className="flex">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={12}
                                                className="fill-yellow-400 text-yellow-400"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dots navigation */}
                <div className="flex justify-center mt-6">
                    <div className="flex space-x-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className={`w-3 h-3 rounded-full ${index === activeIndex ? 'bg-indigo-600' : 'bg-gray-300'
                                    } focus:outline-none`}
                                aria-label={`View testimonial ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Testimonials;







