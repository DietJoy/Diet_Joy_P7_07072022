const Post = require("../models/post_model");
const User = require("../models/user_model");

const fs = require('fs'); // package qui permet d interagir avec le systeme de fichiers du serveur

//Création d'un Post avec la méthode Post
exports.createPost = async (req, res, next) => {

  const tokenUserId = req.auth.userId // récupération de l'userId stocké dans le payload du token

    let userPost = { //initialisation d 'un objet qui contiendra les infos du post
        userId: tokenUserId, // stockage de l'user Id dans le futur post
    }

    if (req.file ) { // Si une image a été envoyée on construit son url et on l'ajout au userPost
        userPost.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`// Génération de l'url de l image
    } 

    if (req.body.text) { // Si le champs text est complété on l'ajoute au userPost
        userPost.text = req.body.text
    }

    try{
      const post = new Post(userPost);// Création du post basé sur le post-modele de mongoose
      const savedPost = await post.save() //enregistrement du post dans la BDD
      const userWhoPosted = await User.findOne({ _id: tokenUserId})  //recherche de l'utilisateur qui correspond au post qui vient d etre publié via l user id authentifié

      const postAssociatedUser = { // Création d'un objet qui regroupe le post et l'utilisateur 
        ...savedPost.toJSON(), // on récupère toutes les infos du post et on    ajoute :
        postUsername: userWhoPosted.name,  // Création des clés nom et prénom de l'utilisateur qu on a trouvé
        postFirstname: userWhoPosted.firstname, // dans l'idée de récup nom et prénom pour envoie plus tard dans le front
      }

      res.status(201).json(postAssociatedUser) // objet renvoyé dans le front
    }
    catch(error){
      res.status(400).json({ error });
    }
};

//Affichage d'un Post par son id avec GET
exports.getOnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id }) // cherche 1 objet dans la bdd ayant _id qui est le même que l id dans le corps de la requete
      .then((post) => res.status(200).json(post))
      .catch((error) => res.status(404).json({ error }));
  };

// Affichage de tous les Posts avec GET
exports.getAllPosts = (req, res, next) => {
  Post.find().sort({createdAt: -1}) // cherche tous les Posts dans le BDD avec moongose et affiche en antéchronologique
    .then((posts) => res.status(200).json(posts))
    .catch((error) => error.status(500).json({ error }));
};