import express from 'express';
import methodOverride from 'method-override';
import morgan from 'morgan';
import passport from 'passport';
import passportConfig from './src/config/passport';
import login from './src/login'
import auth from './src/auth';

import {UserModel} from './src/model/users';
import {ContentsModel} from './src/model/contents';
const restful = require('node-restful');
const mongoose = restful.mongoose; 

const app = express();
const PORT = "8000";

app.use(express.json()); //body-parser 대신
app.use(morgan('dev'));
app.use(methodOverride());
app.use(passport.initialize())
passportConfig();

app.post('/login',login);
app.post('/auth',auth);


mongoose.connect("mongodb://root:mongodb@localhost:27017/gitple?authSource=admin",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

UserModel.register(app,'/users'); //join

ContentsModel.register(app,'/contents');



// app.get('/', (req,res)=> res.send('whwowhdlsf'))

app.listen( PORT, ()=>{
    console.log(`Server is running at PORT ${PORT}`)
})


