const restful = require('node-restful');
import {Schema, Document} from 'mongoose';
import {Request, Response, NextFunction} from 'express';

export interface IUser extends Document {
    userId: string;
    password: string;
    joinedDate: Date;
}

const UserSchema:Schema = new Schema({
    userId: {
        required: true,
        type:String,
        unique: true
    },
    password: {
        required: true,
        type: String
    },
    joinedDate: Date
});


export const UserModel = restful.model(
    'users',UserSchema
).methods(['get','post']);


export const checkIdValid = async(req:Request, res: Response, next:NextFunction) =>{
    console.log(req.params.id)
    const foundId = await UserModel.findOne({userId: req.params.id});

    if(foundId===null){
        return res.status(200).json({
            result: "ok"
        })
    }else{
        return res.status(200).json({ 
            result: "exist Id"
        })
    }
//http code (ㅇ)

}
