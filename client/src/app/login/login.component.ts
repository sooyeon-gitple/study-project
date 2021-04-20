import { Component, OnInit, Input } from '@angular/core';
import { Router} from '@angular/router';

import {User} from '../model/user';
import {UserService} from '../../service/user.service';
import {GlobalState} from '../global-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  submitted:boolean = false;
  loginUser:User = {userId:"", token:"", message:""}

  constructor(
    private userService: UserService,
    private _state: GlobalState,
    private router: Router,
  ){}
  

  ngOnInit(): void {
    this._state.subscribe('login', (userData) => {
      setTimeout(() => {
        if(userData.token && userData.message==="success"){
          window.alert("로그인 되었습니다.");
          // localStorage.setItem("userName","test user name")
          this.router.navigate(['/contents-list']);
          return;
        }else if(userData.message==="failed"){
          return window.alert("로그인 실패!");
        }
      });
    
    });
  }

  onSubmit():void{
    console.log("login submit")
    this.userService.login(this.loginUser.userId, this.loginUser.password);
  }

}


