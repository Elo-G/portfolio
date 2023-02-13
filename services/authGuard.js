const userModel = require('../models/userModel')

let authGuard = async(req,res,next)=>{
    let user = await userModel.findOne({_id: req.session.userId})
    if (user) {
        next()
    }else{
        res.redirect('/')
    }
}

module.exports = authGuard


//authgard est un middlewire qui permet de proteger ma route addproject pr pas que n'importe qui y ai accès via localhost/addProject on le met ds le dossier service