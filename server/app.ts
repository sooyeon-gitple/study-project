import express from 'express';
import methodOverride from 'method-override';
import morgan from 'morgan';
import passport from 'passport';
import passportConfig from './src/config/passport';
import login from './src/login'
import auth from './src/auth';
import getTop5 from './src/config/summarizer';
import cors from 'cors';

import {UserModel,checkIdValid} from './src/model/users';
import {ContentsModel,ContensSchema} from './src/model/contents';
const restful = require('node-restful');
const mongoose = restful.mongoose; 

const app = express();
const PORT = "8000";

// app.set('etag', false); 

app.use(express.json()); //body-parser 대신
app.use(morgan('dev'));
app.use(methodOverride());
app.use(passport.initialize());

// app.use(express.static('public',{etag:false}))

var corsOptions = {
    origin: 'http://localhost:8000/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors())
passportConfig();

app.post('/login',login);


app.get('/auth',(req,res)=>{
    auth(req,res,(user:any)=>{
        if(!user){
          return res.status(404).json({
              message:"User Not Found"
          })
        }
        return res.status(200).json({
            userId : user.userId,
            _id: user._id
        })
    })
})



mongoose.connect("mongodb://root:mongodb@localhost:27017/gitple?authSource=admin",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

UserModel.register(app,'/users'); //join, get user info
ContentsModel.register(app,'/contents'); 

app.get('/id-check/:id',checkIdValid)


  
app.get('/top5',async(req,res)=> {
    let wordList = await getTop5();
    if(wordList.length){
        return res.status(200).json(wordList)
    }else{
        return res.status(500).json({
            message: "Cannot find top 5 list"
        })
    }
})

app.listen( PORT, ()=>{
    console.log(`Server is running at PORT ${PORT}`)
})


