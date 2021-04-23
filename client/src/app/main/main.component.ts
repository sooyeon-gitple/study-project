import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  // styleUrls: ['./main.component.css'],
  providers: []
})
export class MainComponent implements OnInit {

  tapIndex:number = 0;

  constructor() {

  }


  ngOnInit(): void {
  }

  onClickTap(index:number){
    this.tapIndex = index;
  }

}
