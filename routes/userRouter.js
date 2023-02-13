const userModel = require("../models/userModel");
const userRouter = require("express").Router();
const crypto = require('../services/crypto')


//route pr afficher le form login
userRouter.get("/login", async (req, res) => {
  res.render("login.twig");
});


/*route pour ME LOGGER : (pr poster ce que je rentre ds mon form de login et comparer si mon mail et mon password 
correspond à celui que j'ai crée ds la bddme loger afin d'acceder à mes projets) */




userRouter.post("/login", async (req,res)=>{
    const user = await userModel.findOne({ mail: req.body.mail})//trouve moi un user dont le mail est le même que le mail contenu ds le corps de la requête (req.body.mail) (<=>le même mail que j'ai rentré ds ma bdd)
    
    if (user) { // si tu trouve un user et si... 
        if (await crypto.comparePassword(req.body.password, user.password)) { //...si  le mdp cripté du body correspond à celuicelui saisi par l'user 
            req.session.userId = user._id// req.session.userId permet de garder la session de l'user : user._id
            res.redirect('/addProject') // si oui, redirrige moi vers  addproject
        }else{//sinon...
            try {
                res.render('login.twig',{ // rend la page login 
                errConnect: "le mot de passe est  incorrect !!!!!" // et tu m'affiche le msg d'erreur
                })     

            } catch (error) {
                res.send(error)
            }
        }                                                                               //si tu trouve user tu me redirige vers mon form
    }else {
         // et si tu trouve pas d'utilisateur, tu me redirige aussi à ma page d'erreur
            res.render('login.twig',{    
            errConnect: "l'utilisateur n'existe pas !!!!"/*errConnect est une clé , je peux la voir 
                                                        comme une variable qu'on a pas besoin de la déclarer(même si ça n'en ai pas une ) 
                                                         (on peut le voir plutôt comme un attribut , c'est entre {})*/
             })     


    }
})


userRouter.get("/logout", async (req, res) => {
   req.session.destroy()
   res.redirect("/")
  });
 
//route pour m'enregistrer, me créer en tant qu'utilisateur: 
// userRouter.get("/register", async (req,res)=>{
//     let user = {
//         mail: "e.l.o.01@hotmail.fr",
//         password: await crypto.cryptPassword("azerty")
//     }
//     let newUser = new userModel(user)
//     newUser.save()
//     res.redirect('/')
// })






module.exports = userRouter;
