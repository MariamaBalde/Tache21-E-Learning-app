import React, { useState, useEffect } from 'react';
import { db } from '../Config/firebaseConfig';
import { collection, addDoc, query, where, onSnapshot, Timestamp, updateDoc, getDocs } from 'firebase/firestore';
import { useAuth } from '../Hooks/useAuth';

const Messagerie = () => {
  const { user } = useAuth();
  const currentUserId = user?.uid;
  const currentUserRole = user?.role;
  const [message, setMessage] = useState('');
  const [recipientId, setRecipientId] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [notifications, setNotifications] = useState({});
  const [messages, setMessages] = useState([]);

  // Récupérer les utilisateurs avec le rôle opposé
  useEffect(() => {
    if (!currentUserRole) return;

    const usersQuery = query(
      collection(db, 'users'),
      where('role', '==', currentUserRole === 'coach' ? 'etudiant' : 'coach')
    );

    const unsubscribeUsers = onSnapshot(usersQuery, (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
    });

    return () => unsubscribeUsers();
  }, [currentUserRole]);

  // Récupérer les notifications de messages non lus
  useEffect(() => {
    if (!currentUserId) return;

    const messagesQuery = query(
      collection(db, 'messages'),
      where('recipientId', '==', currentUserId),
      where('isRead', '==', false)
    );

    const unsubscribeUnreadMessages = onSnapshot(messagesQuery, (snapshot) => {
      const unreadMessages = {};
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        unreadMessages[data.senderId] = (unreadMessages[data.senderId] || 0) + 1;
      });

      setNotifications(unreadMessages);
    });

    return () => unsubscribeUnreadMessages();
  }, [currentUserId]);

  // Récupérer tous les messages échangés avec le destinataire sélectionné
  useEffect(() => {
    if (!currentUserId || !recipientId) return;

    const messagesQuery = query(
      collection(db, 'messages'),
      where('recipientId', 'in', [currentUserId, recipientId]),
      where('senderId', 'in', [currentUserId, recipientId])
    );

    const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp instanceof Timestamp ? doc.data().timestamp.toDate() : null,
      }));
      setMessages(messagesData);
    });

    return () => unsubscribeMessages();
  }, [currentUserId, recipientId]);

  const handleSendMessage = async () => {
    if (!message.trim() || !recipientId) return;

    const newMessage = {
      text: message,
      senderId: currentUserId,
      recipientId,
      isRead: false,
      timestamp: Timestamp.fromDate(new Date()),
    };

    await addDoc(collection(db, 'messages'), newMessage);

    // Ajouter le message à l'état immédiatement
    setMessages((prevMessages) => [...prevMessages, { ...newMessage, id: 'temp_' + Date.now() }]);

    setMessage('');
  };

  const handleSelectUser = async (user) => {
    setRecipientId(user.id);
    setSelectedUser(user);

    const messagesQuery = query(
      collection(db, 'messages'),
      where('senderId', '==', user.id),
      where('recipientId', '==', currentUserId),
      where('isRead', '==', false)
    );

    const snapshot = await getDocs(messagesQuery);
    snapshot.forEach(async (doc) => {
      await updateDoc(doc.ref, { isRead: true });
    });

    setNotifications(prev => ({ ...prev, [user.id]: 0 }));
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* <div className="w-full md:w-1/4 bg-white shadow-md flex flex-col">
        <h2 className="text-lg font-semibold text-center py-2 border-b">Contacts</h2>
        <div className="flex-1 overflow-y-auto">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => handleSelectUser(user)}
              className={`flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-blue-300 transition ${
                selectedUser?.id === user.id ? 'bg-blue-200 text-black' : ''
              }`}
            >
              <div>
                <p className="text-sm font-medium">{user.nom} {user.prenom}</p>
                {notifications[user.id] > 0 && (
                  <span className="text-xs text-red-500">+{notifications[user.id]}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div> */}

<div className="w-full md:w-1/4 bg-white shadow-md flex flex-col">
  <h2 className="text-lg font-semibold text-center py-2 border-b">Contacts</h2>
  <div className="flex-1 overflow-y-auto">
    {users.map((user) => (
      <div
        key={user.id}
        onClick={() => handleSelectUser(user)}
        className={`flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-blue-300 transition ${
          selectedUser?.id === user.id ? 'bg-blue-200 text-black' : ''
        }`}
      >
        <div>
          <p className="text-sm font-medium">{user.nom} {user.prenom}</p>
        </div>
        {notifications[user.id] > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            +{notifications[user.id]}
          </span>
        )}
      </div>
    ))}
  </div>
</div>

      <div className="flex-1 flex flex-col md:ml-4 mt-4 md:mt-0">
        {selectedUser ? (
          <>
            <div className="bg-blue-800 text-white px-3 py-2">
              <h3 className="text-sm font-semibold">{selectedUser.nom} {selectedUser.prenom}</h3>
            </div>

            <div className="flex-1 p-2 overflow-y-auto bg-gray-100">
              {messages.length > 0 ? (
                messages.sort((a, b) => a.timestamp - b.timestamp).map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex mb-2 ${
                      msg.senderId === currentUserId ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs p-2 rounded-md shadow ${
                        msg.senderId === currentUserId
                          ? 'bg-blue-800 text-white'
                          : 'bg-gray-400'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <span className="text-xs text-gray-800 block mt-1">
                        {msg.timestamp?.toLocaleString([], {
                          dateStyle: 'short',
                          timeStyle: 'short',
                        })}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center text-sm">Aucun message.</p>
              )}
            </div>

            <div className="bg-white p-2 border-t">
              <div className="flex items-center">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Écrivez ici..."
                  className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  className="ml-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-800"
                >
                  Envoyer
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1">
            <p className="text-gray-400 text-sm">Sélectionnez un utilisateur pour discuter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messagerie;
