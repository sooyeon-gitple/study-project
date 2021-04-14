import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {Content} from '../model/content';
import {ContentsService} from '../../service/contents.service';


@Component({
  selector: 'app-contents-detail',
  templateUrl: './contents-detail.component.html',
  styleUrls: ['./contents-detail.component.css']
})
export class ContentsDetailComponent implements OnInit {

  content: Content;

  constructor(
    private contentService: ContentsService,
    private route: ActivatedRoute,
    private location: Location,
    ) { }

  ngOnInit(): void {
    this.getContent();
  }

  getContent():void{
    const id = this.route.snapshot.paramMap.get('id');
    this.contentService.getContent(id).subscribe(
      content => this.content = content
    )
  }

}
