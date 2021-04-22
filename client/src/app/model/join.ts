export interface Join{
    _id?: string,
    userId: string, 
    password: string,
    passwordConfirm: string,
    joinedDate?: Date,
    message?: string
}