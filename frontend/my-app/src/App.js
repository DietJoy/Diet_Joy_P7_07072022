import { useState, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Connexion from './pages/Connexion';
import Home from './pages/Home';
import "./styles/index.scss";
import globalContext from './context';
import { verifToken } from './apiCalls';
import NotFound from './components/NotFound';


const App = () => {

  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)

  useEffect(() => {
    console.log("useEffect APP.js")
    const verifIfAuthenticated = async () => {
      try{
        console.log("hi")
        await verifToken()
        console.log("after verif token")
        setIsUserAuthenticated(true)
      }
      catch(err){
        console.log("verif token failed")
        setIsUserAuthenticated(false)
      }
    }
    verifIfAuthenticated()
  }, []) // UseEffect joué au chargement de la page

  const [isAdmin, setIsAdmin] = useState(false)

  return (
   <BrowserRouter>
   <globalContext.Provider value={{isAdmin, setIsAdmin, setIsUserAuthenticated}}>
   <Routes>
    <Route path="/auth" element= {<Connexion />} />
    {isUserAuthenticated && <Route path="/" element= {<Home />} />}
    { /*  path= "*" fonctionne si jamais l'url ne correspont à rien de déclaré au dessus */ }
    <Route path="*" element={isUserAuthenticated ? <NotFound /> : <Connexion />} />
   </Routes>
   </globalContext.Provider>
   </BrowserRouter>
  );
};

export default App;