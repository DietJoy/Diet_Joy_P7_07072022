import {useEffect, useState} from 'react';
import axios from 'axios';

const Signup = (props) => {
  const setShowSignup = props.setShowSignup; // fonction pour mettre à jour le state showSignup

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [firstname, setFirstname] = useState('');
  const [error, setError] = useState('');

  const submitForm = async (event) => {
    event.preventDefault();

    const sendData = {
      email: email,
      password: password,
      name: name,
      firstname: firstname,
    };

    try {
      const res = await axios.post(
        'http://localhost:3000/api/user/signup',
        sendData
      );
      setShowSignup(false);
    } catch (err) {
      setError(err.message);
    } 
  };

  return (
    <div className="register">
      <h2> Inscription </h2>
      <form onSubmit={submitForm}>
        <label htmlFor="name">Saisissez votre nom : </label>
        <input
          type="text"
          id="name"
          min="2"
          max="30"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="firstName">Saisissez votre prénom : </label>
        <input
          type="text"
          id="firstName"
          min="2"
          max="30"
          required
          onChange={(e) => setFirstname(e.target.value)}
        />
        <label htmlFor="email">Saisissez votre email : </label>
        <input
          type="email"
          id="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Saisissez votre mot de passe : </label>
        <input
          type="password"
          id="password"
          minLength="6"
          maxLength="30"
          required
          title="Le mot de passe doit contenir au minimum 1 minuscule, 6 caracteres de long minimum et max 30"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit"className="envoyer"  />
        <small>{error}</small>{' '}
        {/* message d erreur qui s affiche si il y en a une */}
      </form>
      <p>Vous êtes déjà inscrit ? Veuillez vous connecter</p>
      <button
        type="button"
        className="show-login"
        onClick={() => setShowSignup(false)}
      >
        Connexion
      </button>
    </div>
  );
};

export default Signup;
