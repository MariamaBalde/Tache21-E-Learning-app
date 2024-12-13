import React, { useState } from 'react';

const MessagerieEtudiant = () => {
    const [conversations, setConversations] = useState([
        {
            id: 1,
            name: 'Coach',
            messages: [
                { from: 'Coach', text: 'Bonjour, comment puis-je vous aider ?', time: '10:00' },
                { from: 'Moi', text: 'Bonjour Coach, j’ai une question sur le dernier cours.', time: '10:05' },
            ],
        },
    ]); // Liste des conversations initiales

    const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
    const [newMessage, setNewMessage] = useState('');

    // Fonction pour envoyer un message
    const sendMessage = () => {
        if (newMessage.trim() === '') return;

        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const updatedConversations = conversations.map((conv) => {
            if (conv.id === selectedConversation.id) {
                return {
                    ...conv,
                    messages: [...conv.messages, { from: 'Moi', text: newMessage, time: currentTime }],
                };
            }
            return conv;
        });

        setConversations(updatedConversations);
        setSelectedConversation(updatedConversations.find((conv) => conv.id === selectedConversation.id));
        setNewMessage('');
    };

    return (
        <div className="grid grid-cols-5 mx-auto h-4/5 bg-gray-50 shadow rounded">
            {/* Liste des conversations */}
            <div className="col-span-1 bg-white p-4 border-r">
                <h2 className="text-xl font-bold mb-4">Conversations</h2>
                {conversations.map((conversation) => (
                    <div
                        key={conversation.id}
                        className={`p-3 rounded cursor-pointer ${selectedConversation?.id === conversation.id
                            ? 'bg-blue-100'
                            : 'hover:bg-gray-100'
                            }`}
                        onClick={() => setSelectedConversation(conversation)}
                    >
                        {conversation.name}
                    </div>
                ))}
            </div>

            {/* Zone de discussion */}
            <div className="col-span-4 p-7 flex flex-col">
                {selectedConversation ? (
                    <>
                        <h2 className="text-2xl font-bold mb-4">
                            Discussion avec {selectedConversation.name}
                        </h2>
                        <div className="flex-1 overflow-y-auto p-4 bg-white shadow rounded-lg">
                            {selectedConversation.messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex mb-4 ${message.from === 'Moi' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className="max-w-xs">
                                        <div
                                            className={`px-4 py-2 rounded-lg text-sm ${message.from === 'Moi'
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-200 text-gray-800'
                                                }`}
                                        >
                                            {message.text}
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">{message.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Zone d'envoi de message */}
                        <div className="flex mt-4">
                            <input
                                type="text"
                                className="flex-1 border rounded-l-lg p-2 text-gray-800"
                                placeholder="Écrivez votre message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button
                                className="bg-blue-500 text-white px-4 rounded-r-lg"
                                onClick={sendMessage}
                            >
                                Envoyer
                            </button>
                       </div>
                 </>
                ) : (
                    <p className="text-gray-600">Sélectionnez une conversation pour commencer à discuter...</p>
                )}
            </div>
        </div>
    );
};

export default MessagerieEtudiant;
