import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-five',
  templateUrl: './top-five.component.html',
  styleUrls: ['./top-five.component.css']
})
export class TopFiveComponent implements OnInit {
  topFive = [
    "라이언",
    "무지",
    "콘",
    "네오",
    "프로도"
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
