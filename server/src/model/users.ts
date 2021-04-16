const restful = require('node-restful');
import {Schema, Document} from 'mongoose';


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


