import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../app/model/user';
import {UserService} from '../service/user.service';
import {GlobalState} from './global-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  
  user :User = {token: "", userId:"", message:"test test"};
  title = 'study-project';

  constructor(
    private userService: UserService,
    private _state: GlobalState,
    private router: Router,
  ){}
  
  ngOnInit(): void {
    // const localUserId =  `${localStorage.get("userId")}`;
    // const localUserToken =`${localStorage.get("token")}`;
    // const userData = this.userService.getUserData(localUserId, localUserToken); //실제로는 async

    this._state.subscribe('login', (userData) => {
      // NOTE: setTimeout for ExpressionChangedAfterItHasBeenCheckedError
      setTimeout(() => {
        this.user = {...userData};
        console.log(this.user)
      });
    });
  }
  

  onLogout(){
  
    const confirm = window.confirm('로그아웃 하시겠습니까?');
    confirm && this.userService.logout(this.user.userId, this.user.token);
    confirm && this.router.navigate(['/login']);
    // localStorage.removeItem('userId');
    // localStorage.removeItem('token');
  }
  
}
