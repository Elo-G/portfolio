const express = require ("express")
const mongoose = require ("mongoose")
const session = require("express-session")
const projectRouter = require("./routes/projectRouter")
require ('dotenv').config()
const userRouter = require("./routes/userRouter")
const mailerRouter = require("./routes/mailerRouter")
const db = process.env.BDD_URL


const app = express()
require ('dotenv').config()


app.use(session({secret: process.env.SESSION_PWD,saveUninitialized: true, resave: true}));
app.use(express.static("./assets"))// PERMETS A APP (A EXPRESS) D'UTILISER LES DOSSIERS STATICS DS ASSETS
app.use(express.urlencoded({extended: true}))// ligne specifique pour désencoder  les info saisies ds les form en général (qui s'encode automatiquement avec la methode post)
app.use (express.json())//???
app.use(projectRouter)// permet à app d'utiliser les routes qui sont ds le fichier projectRouter
app.use(userRouter)
app.use(mailerRouter)


app.listen ( 3005,(err)=>{ /*appli écoute sur port3000 (me permet de me connecter à 
                             mon localhost sur le port 3000 où je pourrais voir le rendu de mon appli et vérifier mes routes)*/
if (err){
    console.log(err);
}else{
    console.log("connecté");
}
})

mongoose.set('strictQuery', true); // ce qu on envoie sur bdd  doit etre strictement = à ce qui a sur le schema
mongoose.connect(db, (err)=>{   //mongoose connecte toi à la bdd
    if (err){
        console.log(err);
    }else{ console.log("connecté à la bdd");}
})

