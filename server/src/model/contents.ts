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
        next();
    });
   
}).before('put',async(req:Request,res:Response,next:NextFunction)=>{

    auth(req,res, async(user:any)=>{
    
        const content = await ContentsModel.findOne({_id:req.params.id})

        if(user.userId !== content.userId){
            console.log("user Id not match");
            return res.status(402).json({
                message: "Wrong User Id"
            })
        }
        next();
    })

}).before('delete',(req:Request,res:Response,next:NextFunction)=>{

    auth(req,res, async(user:any)=>{

        const content = await ContentsModel.findOne({_id:req.params.id})

        if(user.userId !== content.userId){
            console.log("user Id not match");
            return res.status(402).json({
                message: "Wrong User Id"
            })
        }
        next();
    })
});
