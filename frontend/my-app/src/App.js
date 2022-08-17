import { useState} from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Connexion from './pages/Connexion';
import Home from './pages/Home';
import "./styles/index.scss";
import globalContext from './context';


const App = () => {

  const [isAdmin, setIsAdmin] = useState(false)

  return (
   <BrowserRouter>
   <globalContext.Provider value={{isAdmin, setIsAdmin}}>
   <Routes>
    <Route path="/" element= {<Connexion />} />
    <Route path="/accueil" element= {<Home />} />
    { /*  path= "*" fonctionne si jamais l'url ne correspont à rien de déclaré au dessus */ }
    <Route path="*" element= {<Connexion />} />
   </Routes>
   </globalContext.Provider>
   </BrowserRouter>
  );
};

export default App;