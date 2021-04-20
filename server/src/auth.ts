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
            // req.login(user, {session:false}, err =>{
            //     const matchId = req.body.userId ===user.userId;
            //     req.body.matchId = matchId;
            //     console.log('(3)');
            //     cb(matchId)
            // })
    
        })(req,res);
}

export default auth; 



