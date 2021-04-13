import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  submitted:boolean = false;
  joinModel = new User('','',new Date());
  isValidId = false;

  constructor() { }

  ngOnInit(): void {
  }


  idValidCheck():void{
    //TODO: check valid @ service
    this.isValidId = true;
  }


  onSubmit():void{

    console.log(this.joinModel)
    
    if(this.isValidId && this.joinModel.userId && this.joinModel.password){
      if(window.confirm("회원 가입 하시겠습니까?")){
        window.alert("가입 되었습니다.")
        this.submitted = true;
      }
    }else{
      window.alert("아이디 중복 확인을 해주세요.")
    }
  }

}
