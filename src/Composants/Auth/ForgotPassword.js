import React, { useState } from 'react';
import { auth } from '../../Config/firebaseConfig';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [erreur, setErreur] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setMessage('Un email de réinitialisation a été envoyé.');
      })
      .catch((error) => {
        setErreur(error.message);
      });
  };

  return (
    <div>
      <h2>Mot de passe oublié</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {message && <p>{message}</p>}
        {erreur && <p>{erreur}</p>}
        <button type="submit">Envoyer un lien de réinitialisation</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
