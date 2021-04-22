import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {Content} from '../model/content';
import {ContentsService} from '../../service/contents.service';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-contents-detail',
  templateUrl: './contents-detail.component.html',
  styleUrls: ['./contents-detail.component.css']
})
export class ContentsDetailComponent implements OnInit {

  content: Content;
  isWritter:boolean = false;

  constructor(
    private contentService: ContentsService,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    ) { }

  ngOnInit(): void {
    this.getContent();
  }

  getContent():void{
    const id = this.route.snapshot.paramMap.get('id');
    this.contentService.getContent(id).subscribe(
      content => {
        this.content = content;

        const localUserToken =`${localStorage.getItem("gitple_token")}`;
        this.userService.getUserData(localUserToken).subscribe(
          userData =>{
            //로그인한 유저 === 글 쓴 유저인지 확인
            (userData.userId === content.userId)? 
              this.isWritter=true: this.isWritter=false;
          }
        )
      }
    )
  }

}
