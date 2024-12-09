import React, { useState, useEffect } from 'react';

const MessagerieEtudiant = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'coach', text: 'Bonjour, comment puis-je vous aider ?', timestamp: '2024-12-05 10:00' },
        { id: 2, sender: 'student', text: 'Bonjour Coach, j’ai une question sur le dernier cours.', timestamp: '2024-12-05 10:05' },
    ]); // Messages fictifs pour l'exemple
    const [newMessage, setNewMessage] = useState('');

    // Fonction pour envoyer un message
    const sendMessage = () => {
        if (newMessage.trim() === '') return;

        const newMsg = {
            id: messages.length + 1,
            sender: 'student',
            text: newMessage,
            timestamp: new Date().toLocaleString(),
        };

        setMessages((prevMessages) => [...prevMessages, newMsg]);
        setNewMessage('');
    };

    return (
        <div className="messagerie-container bg-gray-100 p-4 rounded shadow-md max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-blue-700 text-center">Messagerie</h1>

            {/* Zone d'affichage des messages */}
            <div className="messages-box bg-white p-4 rounded h-64 overflow-y-auto shadow-inner">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`message-item my-2 p-2 rounded ${message.sender === 'student' ? 'bg-blue-100 text-right' : 'bg-gray-200 text-left'
                            }`}
                    >
                        <p className="text-sm">{message.text}</p>
                        <span className="text-xs text-gray-500">
                            {message.sender === 'student' ? 'Moi' : 'Coach'} • {message.timestamp}
                        </span>
                    </div>
                ))}
            </div>

            {/* Zone de saisie pour un nouveau message */}
            <div className="message-input mt-4 flex items-center">
                <input
                    type="text"
                    placeholder="Écrivez un message..."
                    className="flex-1 p-2 border border-gray-300 rounded-l"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-700"
                    onClick={sendMessage}
                >
                    Envoyer
                </button>
            </div>
        </div>
    );
};

export default MessagerieEtudiant;