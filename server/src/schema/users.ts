import {Schema} from 'mongoose';

const userSchema = new Schema({
    userId: String,
    password: String,
    joinedDate: Date
});

export default userSchema;