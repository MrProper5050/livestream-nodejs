const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = (req,res,next)=>{

    //проверка на авторизованность

    const token = req.cookies['access_token']
    if(!token) return res.status(401).redirect('/signin')

    const candidate = jwt.verify(token, config.server.jwt_secret)
    if(!candidate) return res.status(401).redirect('/signin')

    req.user = candidate
    next();
}