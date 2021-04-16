import express from 'express';
import passport from 'passport';


const auth = (req:express.Request, res:express.Response, next:express.NextFunction) =>{
    passport.authenticate(
        'jwt',
        {session: false}, 
        (err, user, info)=>{

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
            console.log(user.userId) //ok
                //TODO: next what ..?

            req.body.userId = user.userId;
            next();

            });
        })(req,res);
}

export default auth;
