import passport from 'passport';
import passportLocal from 'passport-local'; //req의 form-data 와 DB의 User를 비교 (로그인)
import passportJWT from 'passport-jwt'; //JWT token을 읽어 사용자를 인증
import {UserModel,IUser} from '../model/users';

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

export const KEY =  String(process.env.jwt_secret);

const localOption = {
    usernameField:'userId',
    passwordField: 'password'
}

// ????? 
const jwtOption = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: KEY
}

const passportConfig = () =>{

    passport.use(new LocalStrategy(localOption, function(userId, password, cb){  
        // 저장된 user와 비교
        console.log("1. 저장된 user와 비교")
        return UserModel.findOne({userId, password}).then( (user:IUser) =>{
            if(!user){
                return cb(null, false, {message: "Login : Incorect userId or password"});
            }
            return cb(null, user, {message: "Logged In Successfully"});
            }).catch((err: any) => cb(err));
        }
    ));
        
    passport.use(new JWTStrategy(jwtOption,
        //JWT로 사용자 인증
        async function(jwtPayload, cb){
            try{
                console.log("JWT로 사용자 인증");
                const userData = await UserModel.findById(jwtPayload._id)
                return cb(null, userData);
        
            }catch(err){
                return cb(err)
            }
               
        }
      

    ));
}

export default passportConfig;
