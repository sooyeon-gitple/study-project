import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

import {Content} from '../model/content';
import {ContentsService} from '../../service/contents.service';

@Component({
  selector: 'app-contents-posting',
  templateUrl: './contents-posting.component.html',
  styleUrls: ['./contents-posting.component.css']
})
export class ContentsPostingComponent implements OnInit {
  state = "post"; // ["post","edit"]
  submitted = false;
  postingModel = new Content( "1234", "", new Date(), "", "12345");
  id = "";
  //TODO: get user info and set user id

  constructor(
    private contentService: ContentsService,
    private route : ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    
   }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    const path = this.route.snapshot.url[0].path;
    if(path==="edit"){
      this.state = "edit";
      this.getContent();
    }else{
      this.state="post";
    }
    
  }

  goBack(){
    this.location.back();
  }

  getContent():void{
    this.contentService.getContent(this.id).subscribe(
      content => this.postingModel = content
    )
  }

  postContent():void{
    this.contentService.postNewContent(this.postingModel);
    this.submitted = true;
  }

  editContent():void{
    this.contentService.editContent(this.id,this.postingModel);
    this.submitted = true;
  }


  deleteContent():void{
    if(window.confirm('삭제하시겠습니까?') ){
      this.contentService.deleteContent(this.id);
      this.router.navigate(['/contents-list']); //redirect
    }
  }

  onSubmit():void{
    //this.submitted =  true;
    const confirm = window.confirm(`글을 ${this.state==="post"? "등록":"수정"} 하시겠습니까?`);
    
    if(confirm && this.state==="post"){
      //check data
      this.postContent();
      this.router.navigate(['/contents-list']); //redirect

    }else if(confirm && this.state==="edit"){
      this.editContent();
      this.goBack();
    }
  }


}
