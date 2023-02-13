const mongoose = require('mongoose')


//je crée le schéma (le patron) de l'objet projet
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Pas de nom saisi'],// require[true,  veut dire que name est requis pour que ça marche (on met que oui c'est vrai il est requis avec "true")
    },

    technology: {
        type: String,
        required: [true, 'Pas de technologie saisie'],
    },
    url: {
        type: String,
        required: [true, 'Pas de lien saisi']
    },
    githubUrl: {     //lien github car l'employeur voudra voir le code de mon projet et pas que le rendu ds le navigateur
        type: String,
        required: [true, 'Pas de lien saisi']
    },

    img:{
        type: String,
        required: [false, "image est requis"]
    }

})
const projectModel = mongoose.model('projects', projectSchema);/*  la collection que j'appelle "projects" et  qui va être validée par  le schéma project*/
module.exports = projectModel