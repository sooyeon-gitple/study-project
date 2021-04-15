import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  // styleUrls: ['./main.component.css'],
  providers: []
})
export class MainComponent implements OnInit {

  image = 'https://picsum.photos/id/1011/900/500';

  constructor() {

  }


  ngOnInit(): void {
  }

}
