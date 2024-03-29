const User = require('../models/user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.signup = async (req, res, next) => { // fonction assynchrone 
    try {
      if ( !req.body.email || !req.body.password || !req.body.name || !req.body.firstname ) {
        return res.status(404).json ({ error: 'Veuillez remplir le champ'})
      }
      const hash = await bcrypt.hash(req.body.password, 13) // hashage du mot de passe recupéré par le corps de la requete du frontend et salé 13 fois : 1sec
      const user = new User ({ 
          email: req.body.email, // on utlise l'adresse fourni dans le corps de la requete
          password: hash, // avec le mot de passe hashé
          name: req.body.name, // on récupère le nom dans le corps de la requête
          firstname: req.body.firstname // on récupère le prénom dans le corps de la requête
        });
      await user.save() // on utilise la méthode save pour enregistrer l'utilisateur dans la base de donnée
       res.status(201).json({ message: 'Utilisateur créé !' })
    } catch (error) {
       res.status(500).json({ error }) // erreur serveur renvoyée dans un objet
    }
  };

  exports.login = (req, res, next) => { 
    User.findOne({ email: req.body.email}) // Méthode findOne trouver le user et pour comparer l adresse mail qui est unique avec l adresse mail de l'utilisateur qui tente de se connecter
    .then(user => {
        if (!user) { // si on ne trouve pas de user
          return res.status(401).json({ error: 'Utilisateur non trouvé !' }); // erreur 401 non authorisée 
        }
        bcrypt.compare(req.body.password, user.password) //user trouvé et utilisation de bcrypt pour comparer le mot de passe de la requête avec le hash enregistré dans le doc user
          .then(valid => {
            if (!valid) { // boolean et comparaison fausse:
              return res.status(401).json({ error: 'Mot de passe incorrect !' }); // erreur 401 non authorisée
            }
            res.status(200).json({ // renvoi du token en json
                userId: user._id,
                isAdmin: user.isAdmin, 
                token: jwt.sign( // Fonction sign de jsonwebtoken pour encoder le token
                  { 
                    userId: user._id, 
                    isAdmin: user.isAdmin
                  }, // stockage de l userId et de l isAdmin dans le paylod 
                  process.env.TOKEN_SECRET, // Chaine secrète
                  { expiresIn: '12h' }, // expiration du token définie sur 12H
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error })); // erreur serveur
};

