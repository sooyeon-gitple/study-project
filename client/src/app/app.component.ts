import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../app/model/user';
import { UserService } from '../service/user.service';
import { GlobalState } from '../service/global-state.service';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  userData: User;
  title = 'study-project';
  param = {
    user: '',
  };
  currentLanguage;
  modalRef: BsModalRef;
  message: string;
  logoutMessage: string;
  script = {
    ko: '로그아웃 하시겠습니까?',
    en: 'Do you want to sign out?',
  };

  constructor(
    private userService: UserService,
    private _state: GlobalState,
    private router: Router,
    public translate: TranslateService,
    private modalService: BsModalService
  ) {
    translate.addLangs(['ko', 'en']);
    translate.setDefaultLang('ko');

    const browserLang = translate.getBrowserLang();

    translate.use(browserLang.match(/en|ko/) ? browserLang : 'ko');
    translate.onLangChange.subscribe((lang) => {
      this.currentLanguage = lang.translations;
    });

    // translate.setTranslation('ko',
    //  {
    //   HELLO: '안뇽',
    //   MAIN: "홈으로",
    //   CONTENTS: "글 목록",
    //   KEYWORD5: "키워드 TOP 5",
    //   POST: "새 글 등록",
    //   WELCOME: " 님, 환영합니다.",
    //   JOIN:"가입하기",
    //   LOGIN:"로그인",
    //   LOGOUT: "로그아웃"
    // }
    // );
    // translate.setTranslation('en', {
    //   HELLO: 'hello',
    //   MAIN: "HOME",
    //   CONTENTS: "Contents List",
    //   KEYWORD5: "Keyword TOP 5",
    //   POST: "Register new content",
    //   WELCOME: " , Welcome.",
    //   JOIN:"JOIN",
    //   LOGIN:"LOGIN",
    //   LOGOUT: "LOGOUT"
    // });
    // translate.use('ko')
  }

  ngOnInit(): void {
    // const localUserToken = `${localStorage.getItem('gitple_token')}`;

    // // Validate Token
    // if(localUserToken){
    //   this.userService.getUserData(localUserToken).subscribe(
    //     res => {
    //       const userData = {userId: res?.userId, token: localUserToken};
    //       this.userData = userData
    //       this._state.notify('login',userData);
    //     }
    //   )
    // }

    this._state.subscribe('login', (userData) => {
      // NOTE: setTimeout for ExpressionChangedAfterItHasBeenCheckedError
      setTimeout(() => {
        this.userData = userData;
        this.param.user = userData?.userId || null;
      });
    });
  }

  onLogout(template: TemplateRef<any>): void {
    // const confirm = window.confirm(this.currentLanguage.ASK_LOGOUT);
    // if(confirm){
    //   this.userData = null; //Clear userData in app component
    //   this._state.notify('login',null); //Clear global state(login)
    //   localStorage.removeItem('gitple_token');
    //   this.router.navigate(['/login']);
    // }
    const currentLang = this.translate.currentLang;
    this.logoutMessage = this.script[currentLang];
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  // onChangeLanguage(language:string):void{
  //   this.translate.use(language);
  // }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef.hide();
    this.userData = null; // Clear userData in app component
    this._state.notify('login', null); // Clear global state(login)
    localStorage.removeItem('gitple_token');
    this.router.navigate(['/login']);
  }

  decline(): void {
    // this.message = 'Declined!';
    this.modalRef.hide();
  }
}
