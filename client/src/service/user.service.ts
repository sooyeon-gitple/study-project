import {Injectable} from '@angular/core';
import {Join} from '../app/model/join';
import {User} from '../app/model/user';
import {Observable, of} from 'rxjs';
import {GlobalState} from '../app/global-state.service';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userList: Join[];
  userData:User;

  constructor(
    private _state: GlobalState,
    private http: HttpClient
  ) { }

  URL = 'http://localhost:8000';

  // DONE: db connection
  checkIdValid(id:string):Observable<any>{
    return this.http.get<User>(`${this.URL}/id-check/${id}`).pipe(
      catchError(this.handleError('Id validation'))
    )
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
    }).pipe(
      catchError(this.handleError<User>("Get user data"))
    )
  }

  private handleError<T>(operation='operation',result?:T){
    return (error:any): Observable<T> =>{
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T); // 애플리케이션 로직이 끊기지 않도록 기본값으로 받은 객체를 반환합니다.
    }
  }
}
