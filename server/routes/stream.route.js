const router = require('express').Router()
const shortid = require('shortid')
const jwt = require('jsonwebtoken')
const config = require('../config')
const bodyparser = require('body-parser')
const Strm = require('../db/models/streams.model1')
const User = require('../db/models/user.model')

const AuthMW = require('../middlewares/auth.mw')
const isAuthMW = require('../middlewares/isAuth.mw')
const Strms = require('../db/models/streams.model1')

const urlencodedParser = bodyparser.urlencoded({extended:true})

router.get('/stream',async (req,res)=>{
    const streams = await Strm.findAll({where:{state:'online'}})
    console.log(streams)
    res.json(streams)
})

router.post('/stream/create', AuthMW, isAuthMW, urlencodedParser, async (req, res)=>{
    
    const user = await jwt.verify(req.cookies['access_token'], config.server.jwt_secret)

    //проверка на уже имеющийся стрим
    try {
        const candidate = await User.findOne({where:{
            login:user.login
        }})
        console.log(candidate.streamID)
        if(candidate.streamID){
            return res.send('You already have stream')
        }

    } catch (e) {
        
    }

    try {
        const stream = await Strm.create({
            id: shortid.generate(),
            authorLogin: user.login,
            authorId: user.id,
            title: req.body.title,
            description: req.body.descr,
            state: 'ofline'
        })
        await User.update({streamID:stream.id},{where:{ login: user.login }})
        res.status(201).redirect('/profile')
    } catch (error) {
        console.log(error)
    }
   
})

router.delete('/stream/delete/:id', AuthMW, isAuthMW, async (req,res)=>{
    const streamID = req.params.id;

    try {
        const strm = await Strms.findOne({where:{
            id: streamID
        }})
        await strm.destroy()

        const user = await User.update({streamID:''},{where:{streamID}})

        return res.status(204).send('deleted')
    } catch (error) {
        return res.status(500).send('Internal server error')
    }
})

module.exports = router;