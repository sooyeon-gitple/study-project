import { Injectable } from '@angular/core';
import {Join} from '../app/model/join';
import {User} from '../app/model/user';
import {Observable, of} from 'rxjs';
import {GlobalState} from '../app/global-state.service';
import {HttpClient} from '@angular/common/http';
import { catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userList: Join[] = [
    {
      userId: "nana",
      password:"nana",
      passwordConfirm: "nana",
      joinedDate: new Date("2020-01-01"),
    },
    {
      userId: "mango",
      password:"mango",
      passwordConfirm: "mango",
      joinedDate: new Date("2020-01-02")
    },
  ]

  userData:User;

  constructor(
    private _state: GlobalState,
    private http: HttpClient
  ) { }

  URL = 'http://localhost:8000';


  checkIdValid(id:string):boolean{
    return !!this.userList.find(user => user.userId === id)
  }

  join(userData):Observable<Join>{
    return this.http.post<Join>(`${this.URL}/users`, userData).pipe(
      tap( newUser =>console.log("HERE",newUser) ),
      catchError( this.handleError<Join>('Join new User'))
    )
  }

  login(userId:string, password:string):Observable<User>{
    return this.http.post<User>(`${this.URL}/login`, {userId, password})
    .pipe(
      catchError( this.handleError<User>('Login'))
    );
  }

  logout(userId:string, token:string){
    this._state.notify('login', {
      userId: "",
      token: ""
    });
  }

  getUserData(token:string):Observable<User>{
    return this.http.get<User>(`${this.URL}/auth`,{
      headers: {'Authorization':`Bearer ${token}`}
    })
  }

  private handleError<T>(operation='operation',result?:T){
    return (error:any): Observable<T> =>{
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T); // 애플리케이션 로직이 끊기지 않도록 기본값으로 받은 객체를 반환합니다.
    }
  }
}
