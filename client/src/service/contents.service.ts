import { Injectable } from '@angular/core';
import {Content} from '../app/model/content';
import {Observable, of, from} from 'rxjs';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ContentsService {
  contents : Content[] = [
    {
      _id:"1",
      title: "test title",
      date: new Date("2021-01-01"),
      text: "test text blahblah",
      userId: "11"
    },
    {
      _id:"2",
      title: "test title 2",
      date: new Date("2021-01-02"),
      text: "test text blahblah 2",
      userId: "12"
    },
    {
      _id:"3",
      title: "test title 3",
      date: new Date("2021-01-03"),
      text: "test text blahblah 3",
      userId: "13"
    },
  ] 

  constructor(
    private http: HttpClient
  ) { }
  URL ='http://localhost:8000/contents'

  getContents():Observable<Content[]>{
     return this.http.get<Content[]>(`${this.URL}`);
  }

  getContent(id:string):Observable<Content>{
    return this.http.get<Content>(`${this.URL}/${id}`)
  }

  //need token?
  postNewContent(data):Observable<Content>{
    this.contents = [...this.contents, data]
    return data;
  }

  editContent(id,data):void{
    for(let content of this.contents){
      if(content._id ===id){
        content = data;
      }
    }
    console.log(this.contents);
  }

  deleteContent(id):void{
    this.contents = this.contents.filter( content => content._id !==id)
  }

}
