import express from 'express';
import passport from 'passport';


const auth = (req:express.Request, res:express.Response, cb:Function) =>{

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

            cb(user);
    
        })(req,res);
}

export default auth; 



