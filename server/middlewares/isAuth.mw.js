const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = (req,res,next)=>{

    //проверка на авторизованность

    const token = req.cookies['access_token']
    if(!token) {
        req.isAuth = false;  
        return next();
    }

    const candidate = jwt.verify(token, config.server.jwt_secret)
    if(!candidate) {
        req.isAuth = false; 
        return next();
    }

    req.isAuth = true
    req.user = candidate
    next();
}