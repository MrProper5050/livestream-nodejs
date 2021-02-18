const router = require('express').Router()
// const Strm = require('../db/models/streams.model1')
const jwt = require('jsonwebtoken')
const config = require('../config')
const AuthMW = require('../middlewares/auth.mw')
const isAuthMW = require('../middlewares/isAuth.mw')
const getStreamMW = require('../middlewares/getstream.mw')

const path =require('path')
const axios = require('axios')

const User = require('../db/models/user.model')
const Strms = require('../db/models/streams.model1')

router.get('/streamer/:author', AuthMW, isAuthMW, getStreamMW, async (req,res)=>{
    console.log('author: ',req.params.author)

    try {
        const stream = await Strms.findOne({
            where:{
                authorLogin: req.params.author
            }
        })
        if(!stream) return res.status(404).redirect('/');

        return res.render('stream_page',{
            streamTitle: stream.title,
            streamDescr: stream.description
        })
    } catch (error) {
        return res.status(500).json('Internal server error')
    }
    
})
router.get('/streamer/:author/getstream/:filename', AuthMW, isAuthMW, getStreamMW, async (req,res)=>{


    try {
        const user = await User.findOne({where: {login:req.params.author }}) 
        // if(!user) return res.status(404).send('Author not found')
        return res.sendFile(path.join(__dirname,'..','media', 'live' ,user.key, req.params.filename))
    } catch (error) {
        console.log('ERROR', error)
    }
    
})


module.exports = router;