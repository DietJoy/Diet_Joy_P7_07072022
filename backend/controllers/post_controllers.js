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


//Supression d'un Post avec DELETE
exports.deletePost = async (req, res, next) => {
  
  try{
    const post = await Post.findOne({ _id: req.params.id }) // on utilise l id que nous recevons en parametre pour acceder au Post qui est dans la BDD

    if(post === null){ //si on ne trouve pas le post
      return res.status(404).json({message: "Le post n'existe pas."})
    }

    const user = await User.findOne({_id: req.auth.userId}) // on cherche l'utilisateur qui a posté

    if ((post.userId !== req.auth.userId) && user.isAdmin === false) { // si le post n'appartient pas à l'utilisateur faisant la requête ou alors si il n'a pas les droits administrateur on renvoie un code 403
        return res.status(401).json({ message: "Vous n'avez pas les droits de suppression sur ce post !" });
    }

    if(post.imageUrl !== undefined){ // si il y a une image, on va la supprimer dans le dossier image
      const filename = post.imageUrl.split('/images/')[1]; // on retrouve le post grâce à son segment /images/
      fs.unlink(`images/${filename}`, (err) => { // fonction unlike du package fs pour supprimer le fichier que l on cherchait
        if (err){
          console.log(err)
        }
      })
    }

    // suppression du post de la base de données
    await Post.deleteOne({ _id: req.params.id }) // on supprime le post
    res.status(200).json({ message: 'Publication supprimée !'})
  }
  catch(err){
    res.status(500).json({ error })
  } 
};

//Modification du Post avec PUT
exports.modifyPost =  async (req, res, next) => {

  try{
    const post = await Post.findOne({ _id: req.params.id}) // on cherche le post

    if (!post) { //si ce n'est pas le bon post
        return res.status(404).json({ message: "Post non trouvé" });
    }

    const user = await User.findOne({_id: req.auth.userId}) // on cherche l'utilisateur qui a posté

    if ((post.userId !== req.auth.userId) && user.isAdmin === false) { // si le post n'appartient pas à l'utilisateur faisant la requête ou alors si il n'a pas les droits administrateur on renvoie un code 403
        return res.status(403).json({ message: "Vous n'avez pas les droits de modification sur ce post !" });
    }

    const postData = { //autenthification de l'utilisateur et récupération des données initiales sur les likes pour éviter une modif des ces données
        userId: req.auth.userId,
        likes: post.likes,
        usersLiked: post.usersLiked,
        text: req.body.text
    };

    if(req.file){ // Si on upload une nouvelle image lors de la modification, on la prend en compte
        postData.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //on concatène et on reconstruit l url complète du fichier enregistré
    }
      
    if ( post.imageUrl && !req.file) { // si il y a une image dans le post mais pas dans la requete
        postData.imageUrl = null // dans la bdd le champ est null concernant l image
    } 

    await Post.updateOne({ _id: req.params.id }, { ...postData, _id: req.params.id }) //on met à jour
        
    if(req.file || ( post.imageUrl && !req.file)){
      fs.unlink("images/" + post.imageUrl.split("/images/")[1], err => { //on supprime l'image qu'on avait initialement publiée du dossier image
        if (err) console.log({errfirst: err}) ;
      });
    }
          
    res.status(200).json({ message: 'Post modifié !' });
  }
  catch(err){
    if (req.file) { // Si il y avait une image dans la tentative de publication qui a échouée
      console.log({error: "images/" + req.file.filename})
      fs.unlink("images/" + req.file.filename, err => { // on supprime l'image qu on a tenté de publier qui s est automatiquement enregistrée dans le dossier images
        if (err) console.log({errsecond: err});
      });
    }

    res.status(400).json({ error });
  }      
};

