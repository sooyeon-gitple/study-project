const restful =require('node-restful');
import {Schema} from 'mongoose';

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
).methods(['get','post','put','delte']);
