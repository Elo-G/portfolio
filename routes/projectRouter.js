const projectRouter = require("express").Router()
const projectModel = require ("../models/projectModel")
const authGuard = require('../services/authGuard')
const upload = require("../services/uploadFile")


//route pr afficher mon formulaire d'ajout de projet
// toto: projectRouter.get -> Définie une route pour un chemin donnés (ex: /addProject) (càd: la req client  est de se rendre sur addproject)
projectRouter.get("/addProject", authGuard, async(req,res)=>{ 

    // res.render -> Retourne une réponse que tu rend  au client c'et d'afficher  addproject.twig  
    res.render('addProject.twig',)   // res. render = com reponse rend moi la page ('addProject.twig') ( res.rend = rendre une page  et res redirect = rediriger vers une page)
})



//route pr sauvegarder les projets  que j'ai saisi via le formulaire qui est ds addProject.twig
projectRouter.post("/addProject", upload.single("img"), authGuard, async(req,res)=>{
    try {
        if (req.file) {// Si le fichier a été envoyé par le client
            req.body.img = req.file.filename // On defini la clef (l'attribut) img qui est  dans le body de la requette = au filename qui est dans le file de la requete ( cf fichier uploadfile.js)
        }
        let newProject = new projectModel(req.body) // (req.body ) =recupere les donnée que l'user a soumis , et je les transmet au model projectModel, <=>newProject = le nvx projectModel qui prend pr parametre le corps de la requete
        await newProject.save() // tu me le sauvegarde ds la bdd
        res.redirect('/') //et une fois sauvegardé tu me rediriges sur la page  d'acceuil de mon portfolio
} catch (error) {
        res.send(error)
}   
})                     


/*route pour supprimer mes projets:
projectRouter.get ("/deleteProject/:id",authGuard,async(req, res)=>{
try {
    await projectModel.deleteOne({ _id: req.body.id });
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
})*/
    


//route pour afficher nos projets ds le main.twig
projectRouter.get("/", async(req,res)=>{
    let projects= await projectModel.find()  /* projects =tous les projets que tu vas aller me trouver 
                                               CETTE variable "projectS" C'est le même que j'utilise dans {% for project in projectS %}
                                               c'est com ça qu'il a quel endroit de mon twig il doit  m'afficher  les projets*/
                                           
    res.render('main.twig',{  //tu vas les rendre dans main.twig
        projects: projects,   //fichier main.twig tu as le droit d'utiliser les projets avec la clef(l'attribut) project  <=>//(je crée une clé (un attribut) projects qui a pr valeur project )
        userId: req.session.userId //???
    })           
                                        
})

/* Rq: "ds projects:projects", le 1er projects c'est la clé et le deuxième projects c'est la valeur de la clé projects qui est
    = la variable "projects= await projectModel.find()" que j'ai déclaré en haut et cette clé je vais l'utiliser dans mon form de 
    login ds la div que j'ai crée pr afficher les msg d'erreur*/
module.exports = projectRouter