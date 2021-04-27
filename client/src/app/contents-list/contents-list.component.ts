import { Component, OnInit } from '@angular/core';
import {Content} from '../model/content';
import {ContentsService} from '../../service/contents.service'

@Component({
  selector: 'app-contents',
  templateUrl: './contents-list.component.html',
  styleUrls: ['./contents-list.component.css']
})
export class ContentsListComponent implements OnInit {

  contents: Content[];
  // model = new Content( "21", "test title 555", new Date("2021-01-05"),"text text","211");
  
  //TODO: angular life cycle 확인 
  constructor( private contentsService: ContentsService) { }

  ngOnInit(): void {
    this.getContents();
  }

  getContents():void{
    // this.contents = this.contentsService.getContents();
    this.contentsService.getContents().subscribe(
      contents =>{ 
        this.contents = contents
      }
    )
  }

}
