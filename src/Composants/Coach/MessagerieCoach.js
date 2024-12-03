import React, { useState } from "react";

function MessagerieCoach({ coachPhoto }) {
    const [conversations, setConversations] = useState([
        {
            id: 1,
            name: "Alice",
            messages: [
                { from: "Alice", text: "Good morning everyone 🌄", time: "08:45" },
                { from: "Coach", text: "Will we also talk about acceptance and commitment today?", time: "08:46" },
            ],
        },
        {
            id: 2,
            name: "Ishi",
            messages: [
                { from: "Ishi", text: "Evening from my side 😄", time: "20:15" },
            ],
        },
    ]);

    const [selectedConversation, setSelectedConversation] = useState(null);
    const [newMessage, setNewMessage] = useState("");

    const selectConversation = (id) => {
        const conversation = conversations.find((conv) => conv.id === id);
        setSelectedConversation(conversation);
    };

    const sendMessage = () => {
        if (newMessage.trim() === "") return;

        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const updatedConversations = conversations.map((conv) => {
            if (conv.id === selectedConversation.id) {
                return {
                    ...conv,
                    messages: [...conv.messages, { from: "Coach", text: newMessage, time: currentTime }],
                };
            }
            return conv;
        });

        setConversations(updatedConversations);
        setSelectedConversation(
            updatedConversations.find((conv) => conv.id === selectedConversation.id)
        );

        setNewMessage("");
    };

    return (
        <div className="grid grid-cols-5 h-4/5 bg-gray-50">
            {/* Liste des conversations */}
            <div className="col-span-1 bg-white p-4 border-r">
                <h2 className="text-xl font-bold mb-4">Conversations</h2>
                {conversations.map((conversation) => (
                    <div
                        key={conversation.id}
                        className={`p-3 rounded cursor-pointer ${
                            selectedConversation?.id === conversation.id ? "bg-blue-100" : "hover:bg-gray-100"
                        }`}
                        onClick={() => selectConversation(conversation.id)}
                    >
                        {conversation.name}
                    </div>
                ))}
            </div>

            {/* Zone de discussion */}
            <div className="col-span-4 p-7 flex flex-col">
                {selectedConversation ? (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Coach et {selectedConversation.name}</h2>
                        <div className="flex-1 overflow-y-auto p-4 bg-white shadow rounded-lg">
                            {selectedConversation.messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex mb-4 ${
                                        message.from === "Coach" ? "justify-end" : "justify-start"
                                    }`}
                                >
                                    <div className="max-w-xs">
                                        <div
                                            className={`px-4 py-2 rounded-lg text-sm ${
                                                message.from === "Coach"
                                                    ? "bg-blue-500 text-white"
                                                    : "bg-gray-200 text-gray-800"
                                            }`}
                                        >
                                            {message.text}
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">{message.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Formulaire d'envoi de message */}
                        <div className="flex mt-4">
                            <input
                                type="text"
                                className="flex-1 border rounded-l-lg p-2 text-gray-800"
                                placeholder="Type your message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button
                                className="bg-blue-500 text-white px-4 rounded-r-lg"
                                onClick={sendMessage}
                            >
                                Send
                            </button>
                        </div>
                    </>
                ) : (
                    <p className="text-gray-600">Select a conversation to start chatting...</p>
                )}
            </div>
        </div>
    );
}

export default MessagerieCoach;




// // components/Messagerie.js
// // components/Messagerie.js
// import React from "react";

// function MessagerieCoach() {
//     return (
//         <div className="p-6">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Messagerie</h2>
//             <p className="text-gray-600">Liste des conversations avec les étudiants...</p>
//         </div>
//     );
// }

// export default MessagerieCoach;