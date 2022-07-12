const Post = require("../models/post_model");

const fs = require('fs'); // package qui permet d interagir avec le systeme de fichiers du serveur


//Création d'un Post avec la méthode Post

exports.createPost = (req, res, next) => {
    let userPost = { 
        userId:req.auth.userId, //vérif de l'utilisateur    
    }

    if (req.file ) { // Si une image a été envoyée on construit son url et on l'ajout au userPost
        userPost.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`// Génération de l'url de l image
    } 

    if (req.body.text) { // Si le champs text est complété on l'ajoute au userPost
        userPost.text = req.body.text
    }

    const post = new Post (userPost);
    console.log(post);
    post.save() //enregistre du post dans la BDD
      .then((post) => res.status(201).json({ message: 'Post publié !', post}))
      .catch(error => res.status(400).json({ error }));
};