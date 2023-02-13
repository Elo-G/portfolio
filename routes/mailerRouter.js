const express = require ("express")
const mailerRouter = require("express").Router()
const nodemailer = require("nodemailer")
require ('dotenv').config()


// = defini le transporter qui contient le service mail utilisé,ainsi que le compte ( mai utilisé ici c'est gmail)
const transporter = nodemailer.createTransport({ 
  service: "gmail",  
  auth: { user: "fonsat.nodemailer@gmail.com", 
  pass: "dlclhbrybfcawlgi" },
  tls: {rejectUnauthorized: false}
//   ligne à mettre sinon code ne fonctionne pas
});

// ENSUITE ON SECURISERA LE MDP 


mailerRouter.post('/sendMail', async (req, res) =>{
    try{
       console.log(req.body);
       let info = await transporter.sendMail({
          from: process.env.USER_MAIL,// là mettre le mail intermediaire (mail du serveur) qu'ensuite je securise 
          to: process.env.MY_MAIL,//MON VRAI E MAIL PERSO
          subject: req.body.name,//OBJET DU MESSAGE (nom contenu ds l'input name)
         //  html: JSON.stringify(req.body),// = j'envoie tout le form en json mais tout va s'afficher dégueulasse donc dessous je fais en facon propre
        

        html: `
        
      // nom : ${req.body.name} <br>    
        prénom : ${req.body.firstName}<br>
        entreprise : ${req.body.compagny}<br>
        ville : ${req.body.location}<br>
        mail : ${req.body.mail}<br>
        message: ${req.body.message}<br>
        
        // `,
       })
       res.redirect('/')
    }catch (err){
       console.log(err);
       res.send(err)
    }
 })



module.exports = mailerRouter;