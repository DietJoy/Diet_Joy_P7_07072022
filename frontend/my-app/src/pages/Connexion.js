import React from 'react';
import Login from '../components/Login';
import Logo from '../components/Logo';
import Signup from '../components/Signup';


const Connexion = () => {
    return (
        <div className='loginPage'>
            <Logo />
            <Login />
            <Signup />
        </div>
    );
};

export default Connexion;