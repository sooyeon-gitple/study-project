import { Component, 
  Input,
  OnInit, 
  // OnChanges,SimpleChanges,
  // DoCheck,
  // AfterContentInit ,AfterContentChecked,
  // AfterViewInit, AfterViewChecked,
  // OnDestroy 
} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  // styleUrls: ['./main.component.css'],
  providers: []
})
export class MainComponent implements OnInit
// ,OnChanges,DoCheck,AfterContentInit,AfterContentChecked,
// AfterViewInit,AfterViewChecked,OnDestroy 
{

  tapIndex:number = 0;
  constructor() {

  }
  onClickTap(index:number){
    this.tapIndex = index;
  }


  ngOnInit(): void {
    console.log("on init")
  }

  // ngOnChanges(changes:SimpleChanges):void{
  //   console.log("on changes")
  //   console.log(changes)
  // }

  // ngDoCheck():void{
  //   console.log("do check")
  // }

  // ngAfterContentInit():void{  
  //   console.log("after content init")
  // } 

  // ngAfterContentChecked():void{
  //   console.log("after conrtent checked")
  // }

  // ngAfterViewInit():void{
  //   console.log("after view init")
  // }
  // ngAfterViewChecked():void{
  //   console.log("after view checked")
  // }
  // ngOnDestroy():void{
  //   console.log("on destroy")
  // }
  
}
