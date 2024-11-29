import React from 'react';
import logoImage from '../Images/ImagesLandingP/1.png';
import { useState } from 'react';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-sm  fixed top-0 left-0 right-0">
            <div className="container mx-auto px-4  flex justify-between items-center">
                <div className="flex items-center">
                    <img src={logoImage} alt="Q-Bee Logo" className="h-16 w-16 mr-2" />
                </div>
                {/* Navigation for larger screens */}
                <nav className="hidden md:flex space-x-8 fixed-top">
                    <a
                        href="#hero"
                        className="text-gray-600 font-semibold hover:text-indigo-600 hover:shadow-lg transition-all duration-300 hover:border-b-2 hover:border-indigo-600"
                    >
                        Home
                    </a>
                    <a
                        href="#courses"
                        className="text-gray-600 font-semibold hover:text-indigo-600 hover:shadow-lg transition-all duration-300 hover:border-b-2 hover:border-indigo-600"
                    >
                        Courses
                    </a>
                    <a
                        href="#popularCourses"
                        className="text-gray-600 font-semibold hover:text-indigo-600 hover:shadow-lg transition-all duration-300 hover:border-b-2 hover:border-indigo-600"
                    >
                        Mentors
                    </a>
                    <a
                        href="#footer"
                        className="text-gray-600 font-semibold hover:text-indigo-600 hover:shadow-lg transition-all duration-300 hover:border-b-2 hover:border-indigo-600"
                    >
                        About
                    </a>
                </nav>
                <div className="hidden md:flex items-center space-x-4">
                    <a href="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                        Se connecter</a>
                </div>
                {/* Mobile menu button */}
                <button
                    className="md:hidden text-gray-600 focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                        />
                    </svg>
                </button>
            </div>
            {/* Mobile navigation */}
            {isMenuOpen && (
                <nav className="md:hidden bg-white shadow-md">
                    <div className="px-4 py-2 space-y-2">
                        <a href="#hero" className="block text-gray-600 hover:text-gray-900">Home</a>
                        <a href="#cours" className="block text-gray-600 hover:text-gray-900">Courses</a>
                        <a href="#popularCourses" className="block text-gray-600 hover:text-gray-900">Mentors</a>
                        <a href="#footer" className="block text-gray-600 hover:text-gray-900">About</a>
                        {/* <a href="#" className="block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Sign In</a> */}
                        <a
                            href="/login"
                            className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 sm:block sm:px-6 sm:py-3"
                        >
                            Se connecter
                        </a>


                    </div>
                </nav>
            )}
        </header>
    );
}

export default Header;


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import logoImage from '../Images/1.png';

// function Header() {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);

//     return (
//         <header className="bg-white shadow-sm">
//             <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//                 <div className="flex items-center">
//                     <img src={logoImage} alt="Q-Bee Logo" className="h-16 w-16 mr-2" />
//                 </div>
//                 {/* Navigation for larger screens */}
//                 <nav className="hidden md:flex space-x-8">
//                     <Link
//                         to="/hero"
//                         className="text-gray-600 font-semibold hover:text-indigo-600 hover:shadow-lg transition-all duration-300 hover:border-b-2 hover:border-indigo-600"
//                     >
//                         Home
//                     </Link>
//                     <Link
//                         to="/courses"
//                         className="text-gray-600 font-semibold hover:text-indigo-600 hover:shadow-lg transition-all duration-300 hover:border-b-2 hover:border-indigo-600"
//                     >
//                         Courses
//                     </Link>
//                     <Link
//                         to="/mentors"
//                         className="text-gray-600 font-semibold hover:text-indigo-600 hover:shadow-lg transition-all duration-300 hover:border-b-2 hover:border-indigo-600"
//                     >
//                         Mentors
//                     </Link>
//                     <Link
//                         to="/about"
//                         className="text-gray-600 font-semibold hover:text-indigo-600 hover:shadow-lg transition-all duration-300 hover:border-b-2 hover:border-indigo-600"
//                     >
//                         About
//                     </Link>
//                 </nav>
//                 <div className="hidden md:flex items-center space-x-4">
//                     <Link to="/signin" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Sign In</Link>
//                 </div>
//                 {/* Mobile menu button */}
//                 <button
//                     className="md:hidden text-gray-600 focus:outline-none"
//                     onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 >
//                     <svg
//                         className="h-6 w-6"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                     >
//                         <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
//                         />
//                     </svg>
//                 </button>
//             </div>
//             {/* Mobile navigation */}
//             {isMenuOpen && (
//                 <nav className="md:hidden bg-white shadow-md">
//                     <div className="px-4 py-2 space-y-2">
//                         <Link to="/hero" className="block text-gray-600 hover:text-gray-900">Home</Link>
//                         <Link to="/courses" className="block text-gray-600 hover:text-gray-900">Courses</Link>
//                         <Link to="/mentors" className="block text-gray-600 hover:text-gray-900">Mentors</Link>
//                         <Link to="/about" className="block text-gray-600 hover:text-gray-900">About</Link>
//                         <Link
//                             to="/signin"
//                             className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 sm:block sm:px-6 sm:py-3"
//                         >
//                             Sign In
//                         </Link>
//                     </div>
//                 </nav>
//             )}
//         </header>
//     );
// }

// export default Header;




