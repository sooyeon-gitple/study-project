import { Component, OnInit } from '@angular/core';
import {User} from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted:boolean = false;
  loginModel = new User('','');

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit():void{
    console.log(this.loginModel);

  }

}
