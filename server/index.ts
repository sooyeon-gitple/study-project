import express from 'express';
import Users from './src/router/users';
import methodOverride from "method-override";
import morgan from "morgan";
const restful = require('node-restful');
const mongoose = restful.mongoose; 

const app = express();
const PORT = "8000";

app.use(express.json()); //body-parser 대신
app.use(morgan('dev'));
app.use(methodOverride());

mongoose.connect("mongodb://root:mongodb@localhost:27017/gitple?authSource=admin",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

Users.register(app,'/users');



// app.get('/', (req,res)=> res.send('whwowhdlsf'))

app.listen( PORT, ()=>{
    console.log(`Server is running at PORT ${PORT}`)
})


