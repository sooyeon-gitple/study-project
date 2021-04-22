// export class Content{
//     constructor(
//     public _id : string,
//     public title : string,
//     public date : Date,
//     public text : string,
//     public userId : string,  
//     ){    }
// }

export interface Content{
    _id?: string,
    title: string,
    date: Date,
    text: string,
    userId: string
}