import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Content } from '../model/content';
import { ContentsService } from '../../service/contents.service';
import { UserService } from 'src/service/user.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../model/user';
import { GlobalState } from 'src/service/global-state.service';

@Component({
  selector: 'app-contents-detail',
  templateUrl: './contents-detail.component.html',
  styleUrls: ['./contents-detail.component.css'],
})
export class ContentsDetailComponent implements OnInit {
  content: Content;
  isWritter = false;
  userData: User;

  constructor(
    private contentService: ContentsService,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    public translate: TranslateService,
    private _state: GlobalState
  ) {}

  ngOnInit(): void {
    console.log('detail-  onInit');
    this._state.subscribeBehavior('login', (userData) => {
      console.log(userData);
    });
    this.getContent();
  }

  getContent(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.contentService.getContent(id).subscribe((content) => {
      this.content = content;

      // TODO: sub 하자마자 이전 정보 가져오기
      const localUserToken = `${localStorage.getItem('gitple_token')}`;
      this.userService.getUserData(localUserToken).subscribe((userData) => {
        // 로그인한 유저 === 글 쓴 유저인지 확인
        userData.userId === content.userId
          ? (this.isWritter = true)
          : (this.isWritter = false);
      });
    });
  }
}
