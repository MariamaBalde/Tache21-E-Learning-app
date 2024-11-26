import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import './ChatInterface.css';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "instructor",
      content: "Bonjour! Comment puis-je vous aider avec le cours?",
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: "2",
      sender: "student",
      content: "J'ai une question sur le devoir de la semaine dernière",
      timestamp: new Date(Date.now() - 1800000)
    }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        sender: "student",
        content: newMessage,
        timestamp: new Date(),
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <h2>Prof. Martin</h2>
        <p>En ligne</p>
      </div>
      <div className="message-list">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender === "student" ? "sent" : "received"}`}
          >
            <p>{message.content}</p>
            <span className="timestamp">
              {message.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
              })}
            </span>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder="Écrivez votre message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <button onClick={handleSendMessage} className="send-button">
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;

