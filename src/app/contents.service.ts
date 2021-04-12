import { Injectable } from '@angular/core';
import {Content} from './content';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentsService {
  contents : Content[] = [
    {
      id:"1",
      title: "test title",
      date: new Date("2021-01-01"),
      text: "test text blahblah",
      userId: "11"
    },
    {
      id:"2",
      title: "test title 2",
      date: new Date("2021-01-02"),
      text: "test text blahblah 2",
      userId: "12"
    },
    {
      id:"3",
      title: "test title 3",
      date: new Date("2021-01-03"),
      text: "test text blahblah 3",
      userId: "13"
    },
  ] 

  constructor() { }

  getContents():Observable<Content[]>{
    return of(this.contents);
  }
}
