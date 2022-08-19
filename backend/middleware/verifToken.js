const jwt = require('jsonwebtoken'); // package pour vérifier le token
require('dotenv').config()

// Middleware qui vérifie le token (pour vérifier le token quand on raffraichit la page et éviter la rupsture de session à l expiration)
module.exports = (req, res, next) => { 
  try{
    const token = req.headers.authorization.split(' ')[1]; // récupération du token
    //( split crée le tableau , on enleve l espace et on recupre l element 1 soit celui apres bearer)
    const {isAdmin} =  jwt.verify(token, process.env.TOKEN_SECRET); // décodage du token avec la fonction vérify et la clé secrète
    res.status(200).json({isAdmin}) // renvoie de isAdmin au front 
  }
  catch(err){
    res.status(401).json(err.message)
  }
}