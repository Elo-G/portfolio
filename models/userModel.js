const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
   
    mail: {
        type: String,
        required: [true, 'Pas de mail saisi'],
    },
    password: {
        type: String,
        required: [true, 'Pas de mot de passe saisi']
    },
})

const userModel = mongoose.model('users', userSchema); // va mettre ds bdd la collection que j'appelle users et  qui ca être validée par  le userschéma 

module.exports = userModel