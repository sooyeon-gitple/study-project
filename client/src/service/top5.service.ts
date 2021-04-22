import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Top5} from '../app/model/top5'


@Injectable({
  providedIn: 'root'
})
export class Top5Service {

  constructor(
    private http : HttpClient
  ){ }

  URL = 'http://localhost:8000/top5';

  getTop5List():Observable<Top5[]>{
    return this.http.get<Top5[]>(this.URL);
  }
}
