import { Injectable } from '@angular/core';
import {Content} from '../app/model/content';
import {Observable, of, from} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ContentsService {
  contents : Content[];

  constructor(
    private http: HttpClient
  ) { }

  URL ='http://localhost:8000/contents';

  getContents():Observable<Content[]>{
     return this.http.get<Content[]>(`${this.URL}`).pipe(
       catchError(this.handleError<Content[]>('Get contents list'))
     )
  }

  getContent(id:string):Observable<Content>{
    return this.http.get<Content>(`${this.URL}/${id}`).pipe(
      catchError(this.handleError<Content>('Get one content'))
    )
  }

  postNewContent(token:string,data:Content):Observable<Content>{
    return this.http.post<Content>(`${this.URL}`,data,{
      headers: {'Authorization':`Bearer ${token}`},
    }).pipe(
      catchError(this.handleError<Content>('Post new content'))
    )
  }

  editContent(token,data):Observable<Content>{
    return this.http.put<Content>(`${this.URL}/${data._id}`,data,{
      headers: {'Authorization':`Bearer ${token}`},
    }).pipe(
      catchError(this.handleError<Content>('Edit content'))
    )
  }

  deleteContent(token,id):Observable<Content>{
    return this.http.delete<Content>(`${this.URL}/${id}`,{
      headers: {'Authorization':`Bearer ${token}`},
    }).pipe(
      catchError(this.handleError<Content>('Delete content'))
    )
  }

  private handleError<T>(operation='operation',result?:T){
    return (error:any): Observable<T> =>{
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T); // 애플리케이션 로직이 끊기지 않도록 기본값으로 받은 객체를 반환합니다.
    }
  }

}
