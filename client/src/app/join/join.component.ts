import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Join } from '../model/join';
import { UserService } from '../../service/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css'],
})
export class JoinComponent implements OnChanges {
  submitted = false;
  joinModel: Join = {
    userId: '',
    password: '',
    passwordConfirm: '',
    joinedDate: new Date(),
  };
  idCheck: 'ready' | 'pass' | 'fail' = 'ready';
  currentLanguage;

  constructor(
    private userService: UserService,
    public translate: TranslateService
  ) {
    translate.onLangChange.subscribe((lang) => {
      // console.log(lang)
      this.currentLanguage = lang.translations;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
    console.log(123);
  }

  onChangeId(changes: SimpleChanges): void {
    this.idCheck = 'ready';
  }

  idValidCheck(): void {
    this.userService.checkIdValid(this.joinModel.userId).subscribe((res) => {
      if (res.result === 'ok') {
        this.idCheck = 'pass';
      } else {
        this.idCheck = 'fail';
      }
    });
  }

  onSubmit(): void {
    if (
      this.idCheck !== 'pass' ||
      !this.joinModel.userId ||
      !this.joinModel.password
    ) {
      return window.alert('아이디 중복 확인을 해주세요.');
    }

    if (this.joinModel.password !== this.joinModel.passwordConfirm) {
      return window.alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
    }

    if (window.confirm(this.currentLanguage.ASK_JOIN)) {
      const userData = {
        userId: this.joinModel.userId,
        password: this.joinModel.password,
        joinedDate: new Date(),
      };

      this.userService.join(userData).subscribe((result) => {
        if (result._id) {
          window.alert(this.currentLanguage.JOIN_COMPLETE);
          this.submitted = true;
        } else {
          window.alert(this.currentLanguage.JOIN_ERR);
        }
      });
    }
  } // onSubmit ends
}
