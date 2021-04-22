import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../app/model/user';
import {UserService} from '../service/user.service';
import {GlobalState} from './global-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  
  userData :User;
  title = 'study-project';

  constructor(
    private userService: UserService,
    private _state: GlobalState,
    private router: Router,
  ){}
  
  ngOnInit(): void {
    const localUserToken =`${localStorage.getItem("gitple_token")}`;
   
    // Validate Token
    if(localUserToken){
      this.userService.getUserData(localUserToken).subscribe(
        res => { 
          const userData = {userId:res.userId, token:localUserToken};
          this.userData = userData
          this._state.notify('login',userData);
        }
      )
    }
    
    this._state.subscribe('login', (userData) => {
      // NOTE: setTimeout for ExpressionChangedAfterItHasBeenCheckedError
      setTimeout(() => {
        this.userData = userData;
      });
    });
  }
  

  onLogout(){
    const confirm = window.confirm('로그아웃 하시겠습니까?');
    if(confirm){
      this.userData = null; //Clear userData in app component
      this._state.notify('login',null); //Clear global state(login)
      localStorage.removeItem('gitple_token');
      this.router.navigate(['/login']);
    }
  }
  
}
