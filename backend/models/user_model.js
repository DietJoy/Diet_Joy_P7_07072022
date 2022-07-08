
const mongoose = require ('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); //installation du package mongoose-unique-valisator requise

const userSchema = mongoose.Schema ({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true}, // Unique pour que 2 utilisateurs ne puissent pas utiliser la même adresse
    password: { type : String, required: true, minLength: 6, trim: true},
    pseudo: { type: String, required: true, minLength: 2, maxLength: 30, unique: true, trim: true},
    likes: { type: [String]},
    avatar: { type: String, default: "./uploads/profil/random-user.png" }

});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);