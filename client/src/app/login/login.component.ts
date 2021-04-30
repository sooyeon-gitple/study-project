import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../model/user';
import { UserService } from '../../service/user.service';
import { GlobalState } from '../../service/global-state.service';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { template } from 'lodash';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  submitted = false;
  loginUser: User = { userId: '', password: '', token: '' }; // for login form
  currentLanguage;
  modalRef: BsModalRef;
  modalMessage = '';

  constructor(
    private userService: UserService,
    private _state: GlobalState,
    private router: Router,
    public translate: TranslateService,
    private modalService: BsModalService
  ) {  }

  ngOnInit(): void {}
  // TODO: login, contents -> typescript
  // TODO: yarn lint 사용해보기

  onSubmit(template: TemplateRef<any>): void {
    this.userService
      .login(this.loginUser.userId, this.loginUser.password)
      .subscribe((loginData: User) => {
        if (loginData) {
          // window.alert("로그인 되었습니다 🙌")
          this.currentLanguage = this.translate.currentLang;
          // SET Modal message
          this.modalMessage = this.translate.instant('LOGIN_SUCCESS');
          // SHOW modal
          this.modalRef = this.modalService.show(template);
          localStorage.setItem('gitple_token', loginData.token);
          this._state.notifyDataChanged('login', loginData);
          this.router.navigate(['/contents-list']);
        } else {
          // window.alert("로그인 실패 😫 : 아이디와 비밀번호를 확인해주세요.")
          this.currentLanguage = this.translate.currentLang;
          this.modalMessage = this.translate.instant('LOGIN_FAILED');
          this.modalRef = this.modalService.show(template);

          this._state.notify('login', null);
        }
      });
  }

  // openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template);
  // }
}
