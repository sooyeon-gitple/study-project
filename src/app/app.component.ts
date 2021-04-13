import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'study-project';

  onLogout(){
    window.confirm('로그아웃 하시겠습니까?')
  }
  
}
