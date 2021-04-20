import { Injectable } from '@angular/core';
import {Join} from '../app/model/join';
import {User} from '../app/model/user';
import {Observable, of} from 'rxjs';
import {GlobalState} from '../app/global-state.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userList: Join[] = [
    {
      userId: "nana",
      password:"nana",
      joinedDate: new Date("2020-01-01"),

    },
    {
      userId: "mango",
      password:"mango",
      joinedDate: new Date("2020-01-02")
    },
  ]

  userData:User;

  constructor(
    private _state: GlobalState,
  ) { }



  checkIdValid(id:string):boolean{
    return !!this.userList.find(user => user.userId === id)
  }

  join(userData):Observable<Join>{
    this.userList = [...this.userList, userData];
    console.log(this.userList)
    return userData;
  }

  login(userId:string, password:string){
    const selectedUser = this.userList.find(user => user.userId ===userId);

    if(selectedUser){
      this._state.notify('login', {
        userId: userId,
        token: "fake token",   
        message: "success"           
      });
    }else{
      this._state.notify('login', {
        userId: "",
        token: "",
        message: "failed"
      });
    }
  }

  logout(userId:string, token:string){
    this._state.notify('login', {
      userId: "",
      token: ""
    });
  }


  getUserData(userId:string, token:string){
    return this.userList.find( user => user.userId ===userId);
  }



  private handleError<T>(operation='operation',result?:T){
    return (error:any): Observable<T> =>{
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T); // 애플리케이션 로직이 끊기지 않도록 기본값으로 받은 객체를 반환합니다.
    }
  }
}
