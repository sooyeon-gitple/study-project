import { Component, OnInit } from '@angular/core';
import { Top5Service } from 'src/service/top5.service';
import {Top5} from '../model/top5';

@Component({
  selector: 'app-top-five',
  templateUrl: './top-five.component.html',
  styleUrls: ['./top-five.component.css']
})
export class TopFiveComponent implements OnInit {
  top5List:Top5[];
  loading:boolean = true;

  constructor(
    private top5Service: Top5Service
  ) { }

  ngOnInit(): void {
    this.getTop5List();
  }



  getTop5List():void{
     this.top5Service.getTop5List().subscribe(
       top5List =>{
         this.loading = false;
         if(top5List.length>5){
           this.top5List = top5List.slice(0,5);
         }else{
          this.top5List = top5List;
         } 
       }
     )
  }

}
