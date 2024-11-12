// src/components/SignUp.js
import React, { useState } from 'react';
import { auth } from '../Config/firebaseConfig';
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      alert('Inscription réussie !');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">S'inscrire</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignUp;
