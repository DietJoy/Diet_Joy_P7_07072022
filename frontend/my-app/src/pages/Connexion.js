import React, {useState} from 'react';
import Login from '../components/Login';
import Logo from '../components/Logo';
import Signup from '../components/Signup';

const Connexion = () => {
  const [showSignup, setShowSignup] = useState(false); // state: showSignup et fonction: setShowSignup

  return (
    <div className="loginPage">
      <Logo />
      <h1>Inscrivez-vous ou connectez-vous</h1>
      {showSignup ? (
        <Signup setShowSignup={setShowSignup} />
      ) : (
        <Login setShowSignup={setShowSignup} />
      )}
    </div>
  );
};

export default Connexion;
