
const mongoose = require ('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); //installation du package mongoose-unique-validator requise

const userSchema = mongoose.Schema ({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true}, // Unique pour que 2 utilisateurs ne puissent pas utiliser la même adresse
    password: { type : String, required: true, minLength: 6, trim: true},
    name: { type: String, required: true, minLength: 2, maxLength: 30, trim: true},
    firstname :{ type: String, required: true, minLength: 2, maxLength: 30, trim: true},
    isAdmin: { type: Boolean, required: true, default: false}
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);