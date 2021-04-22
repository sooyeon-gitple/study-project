import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Join } from '../model/join';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnChanges {

  submitted:boolean = false;
  joinModel:Join = {
    userId: "", 
    password: "",
    passwordConfirm: "",
    joinedDate: new Date(),
  };
  idCheck = "ready"; //["ready", "pass", "fail"];

  constructor(
    private userService: UserService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  onChangeId(changes: SimpleChanges): void {
    this.idCheck = "ready";
  }


  idValidCheck():void{
    const existId = this.userService.checkIdValid(this.joinModel.userId);
    if(existId){
      this.idCheck = "fail";
    }else{
      this.idCheck= "pass";
    }
  }


  onSubmit():void{
    if(this.idCheck !=="pass" || !this.joinModel.userId || !this.joinModel.password){
      return  window.alert("아이디 중복 확인을 해주세요.");
    }

    if(this.joinModel.password !== this.joinModel.passwordConfirm){
      return window.alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.")
    }

    if(window.confirm("회원 가입 하시겠습니까?")){
        
      const userData = {
        userId :this.joinModel.userId,
        password: this.joinModel.password,
        joinedDate: new Date()
      };
      
      this.userService.join(userData).subscribe(
        result =>{
          if(result._id){
            window.alert("가입 되었습니다.")
            this.submitted = true;
          }else{
            window.alert("가입되지 않았습니다. 새로고침 후 다시 시도해주세요.")
          }
        });
    }

  }//onSubmit ends



}
