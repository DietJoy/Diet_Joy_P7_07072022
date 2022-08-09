const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: {type: String, required: true},
    text: {type: String,}, // le contenu en texte de la publication si nécessaire
    imageUrl: {type: String,}, // le contenu image de la publication si nécessaire
    likes: {type: Number, default: 0, required: true}, // Nombre d'utilisateurs qui likent la publication
    usersLiked: {type: [String], default: [], required: true}, // tableau des utilisateurs qui likent la publication
    author: {type: String, required: true}, // le nom et le prénom de l'utilisateur
    deleteImage: {type: Boolean, default: false}
});

postSchema.set('timestamps', true);

module.exports = mongoose.model('post', postSchema);