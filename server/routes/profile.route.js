const router = require('express').Router()
// const Strm = require('../db/models/streams.model1')
const jwt = require('jsonwebtoken')
const config = require('../config')
const AuthMW = require('../middlewares/auth.mw')
const isAuthMW = require('../middlewares/isAuth.mw')

const Strms = require('../db/models/streams.model1')

router.get('/profile', AuthMW, isAuthMW,async (req,res)=>{
    //получаем user object из токена
    // const token = req.cookies['access_token'];
    // const user = jwt.verify(token, config.server.jwt_secret)
    // console.log(user)
    let stream = await Strms.findOne({
        where:{
            authorLogin: req.user.login
        }
    })
    if(!stream){
        stream = {id:'none',title:'none', state:'none', createdAt:'none'}
    }
    return res.render('profile',{
        login: req.user.login,
        key: req.user.key,
        title:"Profile",
        isAuth: req.isAuth,
        actStream:stream
    })
})


module.exports = router;