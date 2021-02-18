const router = require('express').Router()
const bodyparser = require('body-parser')

const shortid = require('shortid');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../db/models/user.model')
const config = require('../config')

const urlencodedParser = bodyparser.urlencoded({extended:true});

router.get('/signup',async (req,res)=>{
    res.render('auth',{
        authType:"signup"
    });

})
router.get('/signin',async (req,res)=>{
    res.render('auth',{
        authType:"signin"
    });

})
router.post('/signup', urlencodedParser, async (req,res)=>{
    if(!req.body) return res.status(400).json('Bad request')
    const {login, password} = req.body

    if(login.length == 0 || password.length == 0 ) return res.status(400).json('Bad request')
    
    const hashedPass = await bcrypt.hash(password, 12);

    /////already exist check

    try {
        
        const candidate = await User.findOne({where:{
            login
        }})
        if(candidate){
            return res.status(401).json('User with this login already exists')
        }

    } catch (error) {
        return res.status(500).send('Internal server error')
    }

    try{
        await User.create({
            id:shortid.generate(),
            login,
            password:hashedPass,
            key: shortid.generate()
        })
        return res.status(201).redirect('/signin')
    } catch(e) {
        console.log(e)
        return res.status(500).json('Internal server error')
    }
   
   
})
router.post('/signin', urlencodedParser,async (req,res)=>{
    if(!req.body) return res.status(400).json('Bad request1')
    const {login, password} = req.body

    if(login.length == 0 || password.length == 0 ) return res.status(400).json('Bad request2')

    //find user
    try {
        const candidate = await User.findOne({where:{
            login
        }})
        if(!candidate) return res.status(404).json('Invalid login or password')
        
        //password check
        if(!bcrypt.compare(password, candidate.password)) {
            return res.status(404).json('Invalid login or password')
        }

        //if password is normal
        const user = {id:candidate.id, login, key: candidate.key};
        const token = await jwt.sign(user, config.server.jwt_secret,{expiresIn:'7d'});
        res.cookie('access_token', token, { httpOnly:true, maxAge:7*24*60*60*1000, sameSite:true })
        return res.status(200).redirect('/')
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal server error')
    }

})





module.exports = router;