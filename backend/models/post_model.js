const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    /*name: {type: String, required: true}, //le nom de l'utlisateur qui crée la publication
    firstname : {type: String, required: true}, // le prénom de l'utilisateur qui crée la publication*/
    text: {type: String,}, // le contenu en texte de la publication si nécessaire
    imageUrl: {type: String,}, // le contenu image de la publication si nécessaire
    likes: {type: Number, default: 0, required: true}, // Nombre d'utilisateurs qui likent la publication
    usersLiked: {type: [String], default: [], required: true}, // tableau des utilisateurs qui likent la publication
});

module.exports = mongoose.model('post', postSchema);