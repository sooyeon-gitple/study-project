import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import {KEY} from "./config/passport";


const login = (req:express.Request, res:express.Response, next:express.NextFunction) =>{
    passport.authenticate(
        'local',
        {session: false}, 
        (err, user, info)=>{
            console.log(info,user,err)
            
             if(err|| !user){
                 return res.status(400).json({
                     message: "Auth : Incorrect user or Error",
                     user
                 });
             }

             req.login(user, {session:false}, err =>{
                if(err){
                    next(err) 
                }
    
                const token = jwt.sign(user.toJSON(), KEY, {expiresIn:"1h"})
                return res.json({user, token});
             });
        })(req,res);
}

export default login;

