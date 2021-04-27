import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Top5} from '../app/model/top5'
import {catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class Top5Service {

  constructor(
    private http : HttpClient
  ){ }

  URL = 'http://localhost:8000/top5';

  getTop5List():Observable<Top5[]>{
    return this.http.get<Top5[]>(this.URL).pipe(
      catchError(this.handleError<Top5[]>('Get Top5 list'))
    )
  }


  private handleError<T>(operation='operation',result?:T){
    return (error:any): Observable<T> =>{
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T); // 애플리케이션 로직이 끊기지 않도록 기본값으로 받은 객체를 반환합니다.
    }
  }
}
