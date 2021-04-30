import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Content } from '../model/content';
import { ContentsService } from '../../service/contents.service';
import { GlobalState } from '../../service/global-state.service';
import { UserService } from 'src/service/user.service';

import { QuestionService } from '../../service/question.service';
import { QuestionBase } from '../model/question-base';
import { Observable } from 'rxjs';
import { servicesVersion } from 'typescript';

@Component({
  selector: 'app-contents-posting',
  templateUrl: './contents-posting.component.html',
  styleUrls: ['./contents-posting.component.css'],
  providers: [QuestionService],
})
export class ContentsPostingComponent implements OnInit {
  state: 'post' | 'edit';
  postingModel: Content = {
    userId: '',
    title: '',
    text: '',
    date: new Date(),
  };
  id = '';
  token: undefined | null | string;

  questions$: Observable<QuestionBase<any>[]>;

  constructor(
    private contentService: ContentsService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _state: GlobalState,
    private service: QuestionService
  ) {
    this.questions$ = service.getQuestions();
  }

  ngOnInit(): void {
    // TODO: dynamic form 사용해보기 (form builder)

    /*
    OnInit()은 매 페이지 접근시 실행
    subscribe 는 새로고침시에만 (메뉴 링크 타고 접근시 X)
    -> notify 가 되어야만 실행되어서 그런듯

    this._state.subscribe('login', userInfo =>{
      console.log("---start subscribe ---")
      setTimeout(()=>{
        this.token = userInfo.token,
        this.postingModel = {
          ...this.postingModel,
          userId: userInfo.userId
        };
      })
    })
  */

    // 등록인지 수정인지 판단
    this.id = this.route.snapshot.paramMap.get('id');
    const path = this.route.snapshot.url[0].path;
    if (path === 'edit') {
      this.state = 'edit';
    } else {
      this.state = 'post';
    }

    const localUserToken = `${localStorage.getItem('gitple_token')}`;

    // Validate localStorage Token
    if (localUserToken) {
      this.userService.getUserData(localUserToken).subscribe((userData) => {
        if (userData._id) {
          // user exist on DB
          this.token = localUserToken; // 토큰 ㅇㅋ

          if (this.state === 'post') {
            // 새로 쓰는 경우 로그인한(토큰으로 확인된) 유저 아이디를 모델에 넣어줌
            this.postingModel = {
              ...this.postingModel, // 제목 내용은 아직 빈 스트링
              userId: userData.userId,
            };
          } else if (this.state === 'edit') {
            // 기존 글 편집하는경우에는 아이디로 글 불러오기
            this.getContent();
          }
        } else {
          // 토큰은 있는 만료되거나 이상한 토큰 가짐
          window.alert(
            '로그인 시간이 만료되었거나 정상적인 사용자가 아닙니다.'
          );
          this.router.navigate(['/contents-list']); // redirect
        }
      });
    } else {
      // 토큰도 없다니
      this.token = null;
      this.router.navigate(['/contents-list']); // redirect
    }
  }

  goBack(): void {
    this.location.back();
  }

  getContent(): void {
    // params.id 로 글 내용 가져오고 모델에 넣음
    this.contentService.getContent(this.id).subscribe((content) => {
      this.postingModel = content;
    });
  }

  postContent(): void {
    this.contentService
      .postNewContent(this.token, this.postingModel)
      .subscribe((result) => {
        if (result?._id) {
          window.alert('정상 등록되었습니다.');
          this.router.navigate(['/contents-list']); // redirect
        } else {
          window.alert('글이 등록되지 않았습니다. 다시 시도해주세요.');
        }
      });
  }

  editContent(): void {
    this.contentService
      .editContent(this.token, this.postingModel)
      .subscribe((result) => {
        if (result?._id) {
          window.alert('수정되었습니다.');
          this.router.navigate(['/contents-list']); // redirect
        } else {
          window.alert('수정 실패. 다시 시도해주세요.');
        }
      });
  }

  deleteContent(): void {
    if (window.confirm('삭제하시겠습니까?')) {
      this.contentService
        .deleteContent(this.token, this.id)
        .subscribe((res) => {
          window.alert('삭제되었습니다.');
          this.router.navigate(['/contents-list']); // redirect
        });
    }
  }

  onSubmit(): void {
    const confirm = window.confirm(
      `글을 ${this.state === 'post' ? '등록' : '수정'} 하시겠습니까?`
    );

    if (confirm && this.state === 'post') {
      // check data
      if (!this.postingModel.title || !this.postingModel.text) {
        return window.alert('제목과 내용을 입력해야합니다.');
      }
      this.postContent();
    } else if (confirm && this.state === 'edit') {
      this.editContent();
    }
  }

  test(): void {
    console.log('test fn');
  }
}
