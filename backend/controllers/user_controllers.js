const User = require('../models/user_model');
const bcrypt = require('bcrypt');
require('dotenv').config()

exports.signup = async (req, res, next) => { // fonction assynchrone 
    /*console.log(req.body);*/
    try {
      const hash = await bcrypt.hash(req.body.password, 13) // hashage du mot de passe recupéré par le corps de la requete du frontend et salé 13 fois : 1sec
      const user = new User ({ 
          email: req.body.email, // on utlise l'adresse fourni dans le corps de la requete
          password: hash, // avec le mot de passe hashé
          pseudo: req.body.pseudo // on récupère le pseudo dans le corps de la requête
        });
      await user.save() // on utilise la méthode save pour enregistrer l'utilisateur dans la base de donnée
       res.status(201).json({ message: 'Utilisateur créé !' })
    } catch (error) {
       res.status(500).json({ error }) // erreur serveur renvoyée dans un objet
    }
  }
  