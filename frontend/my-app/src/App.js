import { useState, useEffect} from 'react';
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
    const verifIfAuthenticated = async () => {
      try{
        const isUserAdmin = await verifToken()
        console.log({isUserAdmin})
        setIsUserAuthenticated(true)
        setIsAdmin(isUserAdmin)
      }
      catch(err){
        console.log("verif token failed")
        setIsUserAuthenticated(false)
        localStorage.clear()
      }
    }
    verifIfAuthenticated()
  }, []) // UseEffect joué au chargement de la page permet de vérifier la présence et la validité du token pour donner accès aux routes protégés

  const [isAdmin, setIsAdmin] = useState(false)

  return (
   <BrowserRouter>
   <globalContext.Provider value={{isAdmin, setIsAdmin, setIsUserAuthenticated}}>
   <Routes>
    <Route path="/auth" element= {<Connexion />} />
    {isUserAuthenticated && <Route path="/" element= {<Home />} />}
    { /*  path= "*" fonctionne si jamais l'url ne correspont à rien de déclaré au dessus */ }
    <Route path="*" element={isUserAuthenticated ? <NotFound /> : <Connexion />} />
    { /*  path= "*" fonctionne si jamais l'url ne correspont à rien de déclaré au dessus */ }
   </Routes>
   </globalContext.Provider>
   </BrowserRouter>
  );
};

export default App;