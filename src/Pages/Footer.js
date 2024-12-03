import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import logo from '../Images/ImagesLandingP/1.png'

function Footer() {
    return (
        <footer id='footer' className="bg-blue-100 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <img src={logo} alt="Q-Bee Logo" className="h-14 w-14 mr-2" />
                        <p className="text-gray-600">
                            Donner aux apprenants <br /> du monde entier <br /> une éducation de qualité.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="p-2 bg-white rounded-full  hover:bg-gray-300">
                                <FaFacebook className="w-5 h-5 text-indigo-700" />
                            </a>
                            <a href="#" className="p-2 bg-white rounded-full hover:bg-gray-300">
                                <FaTwitter className="w-5 h-5 text-indigo-700" />
                            </a>
                            <a href="#" className="p-2 bg-white rounded-full  hover:bg-gray-300">
                                <FaLinkedin className="w-5 h-5 text-indigo-700" />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Liens</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Accueil</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Cours</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Mentors</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">À propos</a></li>
                        </ul>
                    </div>

                    {/* Community */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Communauté</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Aide</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Partenaires</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Blog</a></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Support</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Mises à jour</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Newsletter</a></li>
                        </ul>
                    </div>
                </div>


                {/* Copyright */}
                <div className="border-t border-gray-300  pt-8 flex justify-between items-center">
                    {/* Texte centré */}
                    <p className="flex-1 text-center">&copy; 2024 ARR-Diangue. All rights reserved.</p>

                    {/* Bouton à gauche */}
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700"
                    >
                        ↑
                    </button>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
