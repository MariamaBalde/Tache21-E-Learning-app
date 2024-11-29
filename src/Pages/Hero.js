import React from 'react';
import studentImage from '../Images/ImagesLandingP/manage.png'; // Remplacez par le chemin correct




function Hero() {
    return (
        <section id='hero' className="container mx-auto px-4 py-16 md:py-24">
            <div className="flex flex-col-reverse md:flex-row items-center justify-between">
                {/* Contenu texte à gauche */}
                <div className="md:w-1/2 md:pr-8 text-left">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Getting <span className="text-indigo-600">Quality</span> Education Is Now More <span className="text-indigo-600">Easy</span>
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Vous fournit le dernier système et matériel d'apprentissage en ligne qui vous aident à développer vos connaissances.
                    </p>
                    <div className="flex space-x-4">
                        <button className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700">
                            Get Started
                        </button>
                    </div>
                </div>

                {/* Image à droite */}
                <div className="md:w-1/2 flex justify-center md:justify-end hidden md:block">
                    <img
                        src={studentImage}
                        alt="Smiling student with thumbs up"
                        className="relative z-10 object-cover w-80 h-80"
                    />
                </div>
            </div>
        </section>
    );
}

export default Hero;


