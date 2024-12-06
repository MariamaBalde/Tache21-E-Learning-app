import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">404 - Page introuvable</h1>
            <Link to="/" className="mt-4 text-indigo-600 hover:underline">
                Retour à l'accueil
            </Link>
        </div>
    );
};

<<<<<<< HEAD
export default NotFound;
=======
export default NotFound;

>>>>>>> 71d6d487494fa3fc94f8663398499a02f2ade8b6
