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
  loginUser:User = {userId:"", token:""}

  constructor(
    private userService: UserService,
    private _state: GlobalState,
    private router: Router,
  ){}
  

  ngOnInit(): void {

  }

  onSubmit():void{
    console.log("login submit")
    this.userService.login(this.loginUser.userId, this.loginUser.password);
    this.router.navigate(['/contents-list']);

    // this._state.notify('login', {
    //   userId: this.loginUser.userId,
    //   token: "fake token"
    // });
   
    // localStorage.setItem("userName","test user name")
    // localStorage.setItem("token","tokentoektn123123")
  }

}


