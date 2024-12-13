import React, { useState, useEffect } from 'react';
import { db } from '../Config/firebaseConfig';
import { collection, addDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { useAuth } from '../Hooks/useAuth';

const Messagerie = ({ onNewMessage }) => {
  const { user } = useAuth();
  const currentUserId = user?.uid;
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [recipientId, setRecipientId] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [notifications, setNotifications] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = await getDocs(collection(db, 'users'));
      const usersData = usersCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (recipientId) {
        const messagesCollection = collection(db, 'messages');
        const messagesQuery = query(
          messagesCollection,
          where('recipientId', 'in', [recipientId, currentUserId]),
          where('senderId', 'in', [recipientId, currentUserId])
        );
        const messagesSnapshot = await getDocs(messagesQuery);
        const messagesData = messagesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp instanceof Timestamp ? doc.data().timestamp.toDate().toISOString() : null,
        }));
        setMessages(messagesData);
      }
    };

    fetchMessages();
  }, [recipientId]);

  const handleSendMessage = async () => {
    setError('');

    if (!message.trim() || !recipientId) {
      setError("Veuillez entrer un message valide et sélectionner un destinataire.");
      return;
    }

    const messageData = {
      text: message,
      senderId: currentUserId,
      recipientId: recipientId,
      isRead: false,
      timestamp: Timestamp.fromDate(new Date()),
    };

    try {
      await addDoc(collection(db, 'messages'), messageData);
      setMessages(prevMessages => [
        ...prevMessages,
        { id: Date.now().toString(), ...messageData }
      ]);

      setMessage('');
      // Mettre à jour les notifications uniquement pour le destinataire
      setNotifications(prev => ({
        ...prev,
        [recipientId]: (prev[recipientId] || 0) + 1,
      }));

      // Réinitialiser les notifications de l'expéditeur pour l'affichage
      setNotifications(prev => ({
        ...prev,
        [currentUserId]: (prev[currentUserId] || 0),
      }));

      if (onNewMessage) onNewMessage();

    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
      setError("Erreur lors de l'envoi du message. Veuillez réessayer.");
    }
  };

  const handleSelectUser = (user) => {
    setRecipientId(user.id);
    setSelectedUser(user);
    // Réinitialiser les notifications pour l'utilisateur sélectionné
    setNotifications(prev => ({ ...prev, [user.id]: 0 }));
    // Charger les messages de l'utilisateur sélectionné
    fetchMessagesForUser(user.id);
  };

  const fetchMessagesForUser = async (userId) => {
    const messagesCollection = collection(db, 'messages');
    const messagesQuery = query(
      messagesCollection,
      where('recipientId', 'in', [userId, currentUserId]),
      where('senderId', 'in', [userId, currentUserId])
    );
    const messagesSnapshot = await getDocs(messagesQuery);
    const messagesData = messagesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp instanceof Timestamp ? doc.data().timestamp.toDate().toISOString() : null,
    }));
    setMessages(messagesData);
  };

  const isStudent = user && user.role === 'etudiant';
  const isCoach = user && user.role === 'coach';

  if (!user) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Liste des utilisateurs connectés */}
      <div className="w-1/3 bg-white p-6 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Messagerie</h1>
        {isCoach && (
          <>
            <h2 className="text-lg font-bold mb-2">Étudiants</h2>
            <div className="max-h-60 overflow-y-auto">
              {users.filter(u => u.role === 'etudiant').map(student => (
                <div 
                  key={student.id} 
                  onClick={() => handleSelectUser(student)} 
                  className={`p-2 border-b cursor-pointer hover:bg-blue-100 transition ${selectedUser?.id === student.id ? 'bg-blue-200' : ''}`}
                >
                  {student.nom} {student.prenom} 
                  {/* Afficher la notification uniquement si le user est le destinataire */}
                  {recipientId !== student.id && notifications[student.id] > 0 && (
                    <span className="ml-2 text-red-500">({notifications[student.id]})</span>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {isStudent && (
          <>
            <h2 className="text-lg font-bold mb-2">Coachs</h2>
            <div className="max-h-60 overflow-y-auto">
              {users.filter(u => u.role === 'coach').map(coach => (
                <div 
                  key={coach.id} 
                  onClick={() => handleSelectUser(coach)} 
                  className={`p-2 border-b cursor-pointer hover:bg-blue-100 transition ${selectedUser?.id === coach.id ? 'bg-blue-200' : ''}`}
                >
                  {coach.nom} {coach.prenom} 
                  {/* Afficher la notification uniquement si le user est le destinataire */}
                  {recipientId !== coach.id && notifications[coach.id] > 0 && (
                    <span className="ml-2 text-red-500">({notifications[coach.id]})</span>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Boîte de discussion */}
      <div className="flex-1 bg-gray-200 p-4 flex flex-col rounded-lg shadow-lg">
        {selectedUser && (
          <div className="bg-white p-4 rounded-lg shadow mb-4 flex-grow">
            <h2 className="text-xl font-bold mb-2">Discussion avec {selectedUser.nom} {selectedUser.prenom}</h2>
            <div className="flex flex-col max-h-80 overflow-y-auto">
              {messages.length > 0 ? (
                messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)).map(msg => {
                  const isCurrentUser = msg.senderId === currentUserId;

                  return (
                    <div key={msg.id} className={`flex items-start mb-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs p-2 rounded-lg shadow ${isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                        <strong>{isCurrentUser ? 'Moi' : (users.find(u => u.id === msg.senderId)?.nom || 'Inconnu')}:</strong> {msg.text}
                        <div className="text-sm text-gray-500">
                          {new Date(msg.timestamp).toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-400 text-center">Aucun message encore. Démarrez la conversation !</p>
              )}
            </div>
          </div>
        )}

        {selectedUser && (
          <div className="flex mt-auto">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Entrez votre message"
              className="flex-1 border p-2 rounded-lg shadow focus:outline-none focus:ring focus:ring-blue-400 transition"
            />
            <button 
              onClick={handleSendMessage} 
              className="bg-blue-600 text-white py-2 px-4 rounded-lg ml-2 hover:bg-blue-700 transition"
            >
              Envoyer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messagerie;

