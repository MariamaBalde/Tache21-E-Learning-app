import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './ConversationList.css';

const conversations = [
  {
    id: "1",
    name: "Prof. Martin",
    role: "Mathématiques",
    lastMessage: "Bonjour! Comment puis-je vous aider?",
    time: "09:40",
    unread: 2,
  },
  {
    id: "2",
    name: "Dr. Sophie",
    role: "Sciences",
    lastMessage: "Le devoir est pour vendredi",
    time: "Hier",
    unread: 0,
  },
  {
    id: "3",
    name: "M. Pierre",
    role: "Histoire",
    lastMessage: "Excellent travail sur le projet!",
    time: "Lun",
    unread: 0,
  },
];

const ConversationList = () => {
  return (
    <div className="conversation-list">
      <h2>Messages</h2>
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Rechercher..." />
      </div>
      <div className="conversations">
        {conversations.map((conversation) => (
          <div key={conversation.id} className="conversation-item">
            <div className="conversation-info">
              <div className="conversation-header">
                <h3>{conversation.name}</h3>
                <span className="time">{conversation.time}</span>
              </div>
              <p className="role">{conversation.role}</p>
              <p className="last-message">{conversation.lastMessage}</p>
            </div>
            {conversation.unread > 0 && (
              <span className="unread-badge">{conversation.unread}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationList;

