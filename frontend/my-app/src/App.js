import React from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Connexion from './pages/Connexion';
import Home from './pages/Home';
import "./styles/index.scss";

const App = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element= {<Connexion />} />
    <Route path="/accueil" element= {<Home />} />
    { /*  path= "*" fonctionne si jamais l'url ne correspont à rien de déclaré au dessus */ }
    <Route path="*" element= {<Connexion />} />
   </Routes>
   </BrowserRouter>
  );
};

export default App;