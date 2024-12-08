import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardDocumentIcon, PencilIcon, ArchiveBoxIcon, PlayIcon } from '@heroicons/react/24/outline';

const QuizCard = ({ quiz, onToggleArchive }) => {
  return (
    <div
      className={`bg-white shadow-md rounded-lg p-6 border ${quiz.archived ? 'border-gray-400' : 'border-blue-600'}`}
    >
      <h3 className="font-bold text-xl text-blue-600 mb-2">{quiz.title}</h3>
      <p className="text-gray-500 mb-4">Cours : {quiz.course}</p>

      <div className="flex justify-between items-center mt-4">
        {/* Voir les questions */}
        <Link to={`quiz-details/${quiz.id}`} className="relative group p-2 text-blue-600 hover:bg-blue-100 rounded-md transition">
          <ClipboardDocumentIcon className="h-6 w-6" />
          <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-sm bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Voir
          </span>
        </Link>

        {/* Jouer au quiz */}
        <Link to={`quiz-details/${quiz.id}/play-quiz/${quiz.id}`} className="relative group p-2 text-green-600 hover:bg-green-100 rounded-md transition">
          <PlayIcon className="h-6 w-6" />
          <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-sm bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Jouer
          </span>
        </Link>

        {/* Modifier */}
        <Link to={`edit-quiz/${quiz.id}`} className="relative group p-2 text-yellow-600 hover:bg-yellow-100 rounded-md transition">
          <PencilIcon className="h-6 w-6" />
          <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-sm bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Modifier
          </span>
        </Link>

        {/* Archiver / Désarchiver */}
        <button
          className={`relative group p-2 ${quiz.archived ? 'text-green-600' : 'text-red-600'} hover:bg-gray-100 rounded-md transition`}
          onClick={() => onToggleArchive(quiz.id, quiz.archived)}
        >
          <ArchiveBoxIcon className="h-6 w-6" />
          <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-sm bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            {quiz.archived ? 'Désarchiver' : 'Archiver'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default QuizCard;

