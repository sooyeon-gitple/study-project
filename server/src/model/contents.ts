const restful = require('node-restful');
import {Schema} from 'mongoose';
import {Request, Response, NextFunction} from 'express';
import auth from '../auth';



export const ContensSchema:Schema = new Schema({
   title: String,
   date: {
       default: new Date(),
       type:Date
    },
   text: String,
   userId:{
    required: true,
    type: String
   }
});



export const ContentsModel = restful.model(
    'contents', ContensSchema
).methods(['get','post','put','delete'])
.before('post',(req:Request,res:Response,next:NextFunction)=>{
 
    auth(req,res,(user:any)=>{
        console.log(user)
        next();
    });
   
}).before('put',async(req:Request,res:Response,next:NextFunction)=>{

    auth(req,res, (user:any)=>{
    
        if(user.userId !== req.body.userId){
            console.log("user Id not match");
            return res.status(402).json({
                message: "Wrong User Id"
            })
        } 
        next();
    })

}).before('delete',(req:Request,res:Response,next:NextFunction)=>{

    auth(req,res, (user:any)=>{
    
        if(user.userId !== req.body.userId){
            console.log("user Id not match");
            return res.status(402).json({
                message: "Wrong User Id"
            })
        }
        next();
    })
});
