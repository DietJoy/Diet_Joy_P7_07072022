import React from 'react';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import Publications from '../components/Publications';

const Home = () => {
    return (
        <div>
            <Logo />
            <Navigation />
            <Publications />
            <h1> ACCUEIL </h1>
        </div>
    );
};

export default Home;