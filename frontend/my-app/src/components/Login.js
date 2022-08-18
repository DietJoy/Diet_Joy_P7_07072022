import { useNavigate } from 'react-router-dom';
import {useState, useContext} from 'react';
import axios from 'axios';
import globalContext from '../context';

const Login = (props) => {
  const setShowSignup = props.setShowSignup;

  const {setIsAdmin, setIsUserAuthenticated} = useContext(globalContext)

  const navigate = useNavigate() 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submitForm = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/api/user/login', {
        email: email,
        password: password,
      });
      console.log(res);

      const token = res.data.token;
      const userId = res.data.userId;

      setIsAdmin(res.data.isAdmin)

      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      // window.location = "/accueil"
      setIsUserAuthenticated(true)
      navigate("/")

    } catch (err) {
      setError(err.response.data?.error || err.message);
    } // Affichage de mon message d'erreur prévu si il existe sinon l erreur renvoyé par l Api
  };

  return (
    <div className="login">
      <h2> Connexion </h2>
      <form onSubmit={submitForm}>
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
          min="6"
          max="30"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" className="envoyer" />
        <small>{error}</small>{' '}
        {/* message d erreur qui s affiche si il y en a une */}
      </form>
      <p>Vous n'avez pas de compte ? Veuillez vous inscrire</p>
      <button
        type="button"
        className="show-signup"
        onClick={() => setShowSignup(true)}
      >
        Inscription
      </button>
    </div>
  );
};

export default Login;
