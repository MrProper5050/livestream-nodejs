const nms = require('./nms')
const express = require('express')
const app = express()
const exphbs  = require('express-handlebars');

const path = require('path')
const axios = require('axios')
const cookieParser = require('cookie-parser')

const sequelize = require('./db/connect')



const StreamRoute = require('./routes/stream.route');
const AuthRoute = require('./routes/auth.route');
const ProfileRoute = require('./routes/profile.route');
const StreamPageRoute = require('./routes/streampage.route');

const Strms = require('./db/models/streams.model1')

const isAuthMW = require('./middlewares/isAuth.mw')


app.use(express.static(path.join(__dirname,'public')));

app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,'views'))

app.use(cookieParser())

app.use(StreamRoute)
app.use(AuthRoute)
app.use(ProfileRoute)
app.use(StreamPageRoute)

app.get('/', isAuthMW, async (req, res)=>{

    //get all streams over nms API
    //find users

    let noStreams = false;
    let streams_list = await Strms.findAll({where:{
      state: 'online'
    }})
    
    if(streams_list.length == 0) {
      noStreams=true;
    }
   

    res.render('index', {
      streams_list,
      noStreams,
      isAuth: req.isAuth
    })
    
});


async function start(){
  

  try {
    await sequelize.sync()
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  app.listen(3020, () => console.log(`App listening on 3020!`));
  
  
 nms.run()
 
}
start()
