import { Component, OnInit } from '@angular/core';
import {Content} from '../content';
import {ContentsService} from '../contents.service'

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.css']
})
export class ContentsComponent implements OnInit {

  contents: Content[];
  model = new Content( "21", "test title 555", new Date("2021-01-05"),"text text","211");
  
  constructor( private contentsService: ContentsService) { }

  ngOnInit(): void {
    this.getContents();
  }

  getContents():void{
    // this.contents = this.contentsService.getContents();
    this.contentsService.getContents().subscribe(
      contents => this.contents = contents
    )
  }

}
