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
    password: "string",
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
    console.log(this.joinModel)
    const existId = this.userService.checkIdValid(this.joinModel.userId);
    if(existId){
      this.idCheck = "fail";
    }else{
      this.idCheck= "pass";
    }
  }


  onSubmit():void{

    console.log(this.joinModel)
    
    if(this.idCheck && this.joinModel.userId && this.joinModel.password){
      if(window.confirm("회원 가입 하시겠습니까?")){
        window.alert("가입 되었습니다.")
        this.submitted = true;
      }
    }else{
      window.alert("아이디 중복 확인을 해주세요.")
    }
  }

}
