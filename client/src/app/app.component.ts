import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../app/model/user';
import {UserService} from '../service/user.service';
import {GlobalState} from '../service/global-state.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  userData: User;
  title = 'study-project';
  param = {
    user: ""
  }
  currentLanguage;

  constructor(
    private userService: UserService,
    private _state: GlobalState,
    private router: Router,
    public translate: TranslateService
  ){
    translate.addLangs(['ko','en']);
    translate.setDefaultLang('ko');

    const browserLang = translate.getBrowserLang();
    console.log(browserLang)

    translate.use(browserLang.match(/en|ko/)? browserLang:'ko');
    translate.onLangChange.subscribe( lang =>{
      this.currentLanguage =lang.translations;
    })

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
    const localUserToken = `${localStorage.getItem('gitple_token')}`;

    // Validate Token
    if( localUserToken){
      this.userService.getUserData(localUserToken).subscribe(
        res => {
          const userData = {userId: res.userId, token: localUserToken};
          this.userData = userData
          this._state.notify('login',userData);
        }
      )
    }
    
    this._state.subscribe('login', (userData) => {
      // NOTE: setTimeout for ExpressionChangedAfterItHasBeenCheckedError
      setTimeout(() => {
        this.userData = userData;
        this.param.user = userData.userId;
      });
    });
  }
  

  onLogout(){
    const confirm = window.confirm(this.currentLanguage.ASK_LOGOUT);
    if(confirm){
      this.userData = null; //Clear userData in app component
      this._state.notify('login',null); //Clear global state(login)
      localStorage.removeItem('gitple_token');
      this.router.navigate(['/login']);
    }
  }

  // onChangeLanguage(language:string):void{
  //   this.translate.use(language);
  // }
  
}
