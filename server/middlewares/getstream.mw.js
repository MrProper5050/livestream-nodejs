const jwt = require('jsonwebtoken')
const config = require('../config')

const User = require('../db/models/user.model')
const Strms = require('../db/models/streams.model1')

module.exports = async (req,res,next)=>{

   
    console.log(req.params.author)
    const username = req.params.author
    if(username.length == 0) return res.status(400).redirect('/')
    try {
         //смотрим есть ли такой пользователь ваще
        const candidate = await User.findOne({where:{login:username}})
        if(!candidate) return res.status(404).redirect('/');

        //смотрим есть ли у него активный стрим
        const stream = await Strms.findOne({where:{authorId:candidate.id}})
        if(!stream) return res.status(404).redirect('/');
        if(stream.state !== 'online') return res.status(404).redirect('/');

        next();
    } catch (error) {
        return res.status(500).send('Internal server error')
    }

    
}