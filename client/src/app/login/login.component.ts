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
  loginUser:User = {userId:"",password:"",token:""}; //for login form

  constructor(
    private userService: UserService,
    private _state: GlobalState,
    private router: Router,
  ){}
  

  ngOnInit(): void {  }

  onSubmit():void{
    this.userService.login(this.loginUser.userId, this.loginUser.password)
    .subscribe( (loginData:User) => {
      if(loginData){
        window.alert("로그인 되었습니다 🙌")
        localStorage.setItem("gitple_token",loginData.token);
        this._state.notify('login',loginData);
        this.router.navigate(['/contents-list']);
      }else{
        window.alert("로그인 실패 😫 : 아이디와 비밀번호를 확인해주세요.")
        this._state.notify('login',null)
      }
    })
  }

}


